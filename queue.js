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
exports.push = function(query_str, device_ip) {

	if (exports.list[device_ip]) {
		if (exports.list[device_ip].free) {
			exports.list[device_ip].free = 0
			exports.get(query_str, device_ip)
		} else {
			exports.list[device_ip].queries.push(query_str)
		}
	}
}

// если очередь непуста, достаём запрос и выполняем
// иначе - помечаем очередь пустой
exports.shift =  function(device_ip) {
	if (device_ip) {
		if (exports.list[device_ip]) {
			if (exports.list[device_ip].queries.length) {
				var query = exports.list[device_ip].queries.shift()
				exports.get(query, device_ip)
			} else {
				exports.list[device_ip].free = 1
			}
		}
	}
}

// упрощённый get (обёртка над http.get)
// выполняем запрос, после - сразу следующий из очереди
exports.get = function(query, device_ip) {
	mlog.dev('Исходящий запрос')
	mlog.dev(query)
	// простой get
	var request = http.get(query, function(res) {

		// доп. действия после запроса
		exports.shift(device_ip)

	// обработка ошибок
	}).on('error', function(e) {
		if (e.code === 'ETIMEDOUT') {

		} else {
			exports.shift(device_ip)
		}
	}).setTimeout( globals.get('socket_wait_time'), function( ) {
		exports.shift(device_ip)
	})
}