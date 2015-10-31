var http = require('http')

// список очередей
// для каждого ip - одна очередь
exports.list = []

// строим очередь заново из config
exports.reset = function() {
	config.list.forEach(function (device) {
		exports.list[device.ip] = {
			queries: [],
			free:    1,
		}
	})
}

// запрос get
// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.push = function(device_name, command, parameter) {
	var device = devices.get(device_name)
	var query = {}
	query.url = devices.build_query(device_name, command, parameter)
	if (exports.list[device.ip]) {
		if (exports.list[device.ip].free) {
			exports.list[device.ip].free = 0
			exports.get(query, device)
		} else {
			exports.list[device.ip].queries.push(query)
		}
	}
}

// если очередь непуста, достаём запрос и выполняем
// иначе - помечаем очередь пустой
exports.shift =  function(device) {
	if (device) {
		if (exports.list[device.ip]) {
			if (exports.list[device.ip].queries.length) {
				var query = exports.list[device.ip].queries.shift()
				exports.get(query, device)
			} else {
				exports.list[device.ip].free = 1
			}
		}
	}
}

// упрощённый get (обёртка над http.get)
// выполняем запрос, после - сразу следующий из очереди
exports.get = function(query, device) {
	mlog.dev('Исходящий запрос')
	mlog.dev(query)
	var device = device
	// простой get
	var request = http.get(query.url, function(res) {

		// доп. действия после запроса
		exports.shift(device)

	// обработка ошибок
	}).on('error', function(e) {
		if (e.code === 'ETIMEDOUT') {

		} else {
			exports.shift(device)
		}
	}).setTimeout( globals.get('socket_wait_time'), function( ) {
		exports.shift(device)
	})
}