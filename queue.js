var http = require('http');

exports.list = [];

// строим очередь заново из config
exports.reset = function() {
	config.list.forEach(function (device) {
		exports.list[device.ip] = {
			queries: [],
			free:    1,
		};
	});
}

exports.push = function(device_name, command, parameter, timer, enable_mutex, cb, params) {
	var device = devices.get(device_name);
	var query = {};
	query.url = devices.build_query(device_name, command, parameter);
	query.timer = timer;
	query.cb     = cb;
	query.params = params;
	if (exports.list[device.ip]) {
		dev_log('push');
		if (exports.list[device.ip].free) {
			dev_log('push free');
			exports.list[device.ip].free = 0;
			exports.get(query, device);
		} else {
			dev_log('push busy');
			exports.list[device.ip].queries.push(query);
		}
	}
}

exports.shift =  function(device) {
	if (device) {
		if (exports.list[device.ip]) {
			dev_log('shift');
			if (exports.list[device.ip].queries.length) {
				dev_log('shift length>0');
				var query = exports.list[device.ip].queries.shift();
				exports.get(query, device);
			} else {
				dev_log('shift length=0');
				exports.list[device.ip].free = 1;
			}
		}
	}
}

// упрощённый get
exports.get = function(query, device) {
	dev_log(device);
	var cb = query.cb;
	var params = query.params;
	var timer_value = query.timer;
	var device = device;

	// простой get
	var request = http.get(query.url, function(res) {

		// таймаут
		if (timer_value) {
			timers.start(timer_value)
		}

		// доп. действия после запроса
		if (cb) {
			cb(params || {});
		}
		dev_log('request end');
		exports.shift(device);

	// обработка ошибок
	}).on('error', function(e) {
		if (e.code === 'ETIMEDOUT') {

		} else {
			exports.shift(device);
		}
	}).setTimeout( helpers.get_timeout('SOCKET_WAIT_TIME')*1000, function( ) {
		if (e.code === 'ETIMEDOUT') {
			exports.shift(device);
		} else {

		}
	});
}