var http = require('http')

exports.list = [];

// строим очередь заново из config
exports.reset = function() {
	config.list.forEach(function (device) {
		exports.list[device.ip] = {
			queries: [],
			free:    1,
		}
	})
}

exports.push = function(device_name, command, parameter, cb, params) {
	var device = devices.get(device_name);
	var query = {};
	query.url = devices.build_query(device_name, command, parameter);
	query.cb     = cb;
	query.params = params;
	if (exports.list[device.ip]) {
		if (exports.list[device.ip].free) {
			exports.list[device.ip].free = 0;
			exports.get(query, device);
		} else {
			exports.list[device.ip].queries.push(query);
		}
	}
}

exports.shift =  function(device) {
	if (device) {
		if (exports.list[device.ip]) {
			if (exports.list[device.ip].queries.length) {
				var query = exports.list[device.ip].queries.shift();
				exports.get(query, device);
			} else {
				exports.list[device.ip].free = 1;
			}
		}
	}
}

// упрощённый get
exports.get = function(query, device) {
	var cb = query.cb;
	var params = query.params;
	var device = device;
	// простой get
	var request = http.get(query.url, function(res) {

		// доп. действия после запроса
		if (cb) {
			cb(params || {});
		}
		exports.shift(device);

	// обработка ошибок
	}).on('error', function(e) {
		if (e.code === 'ETIMEDOUT') {

		} else {
			exports.shift(device);
		}
	}).setTimeout( globals.get('socket_wait_time'), function( ) {
		exports.shift(device);
	});
}