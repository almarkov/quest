var http   = require('http');

var fs = require('fs');

exports.send_get = function(device_name, command, parameter, enable_timer, enable_mutex, cb, params) {

	simple_log('-> ' + device_name + ' ' + command + ' ' + parameter);

	var query  = devices.build_query(device_name, command, parameter);
	var device = devices.get(device_name);

	var n_cnt = config.mutex_repeats_count;
	var _interval = setInterval(function() {
		if (!device.mutex) {
			if (enable_mutex) {
				device.mutex = 1;
			}

			var request = http.get(query, function(res) {

					if (enable_mutex) {
						device.mutex = 0;
					}

					if (enable_timer) {
						res.on('data', function(data){
							http.get(devices.build_query('timer', 'activate', enable_timer), function(res) {
									res.on('data', function(data){
										var result = JSON.parse(data);
										devices.get('timer').state = result.state.state;
									});
								}).on('error', function(e) {
									simple_log("timer activate error: ");
							});
						});
						res.on('error', function(data){
							});
					} 
					if (cb) {
						cb(params || {});
					}
				}).on('error', function(e) {
					simple_log("first attempt " + device_name +  " " + command + " error");
				}).setTimeout( helpers.get_timeout('SOCKET_WAIT_TIME')*1000, function( ) {
					if (enable_mutex) {
						device.mutex = 0;
					}

					if (enable_timer) {
						http.get(devices.build_query('timer', 'activate', enable_timer), function(res) {
								res.on('data', function(data){
									var result = JSON.parse(data);
									devices.get('timer').state = result.state.state;
								});
							}).on('error', function(e) {
								simple_log("timer activate error: ");
						});
					} 
					if (cb) {
						cb(params || {});
					}
					simple_log(device_name +  " " + command + " timeout");

					http.get(query, function(res) {
							res.on('data', function(data){
							});
							res.on('error', function(data){
							});
						}).on('error', function(e) {
							simple_log("second attempt " + device_name +  " " + command + " error");
					});
			});
			clearInterval(_interval);
		} else {
			n_cnt -= 1;
			if (n_cnt == 0) {
				clearInterval(_interval);
			}
		}
	}, config.mutex_timeout);

}

exports.get_timeout = function(timer) {
	return config.timeouts[timer];
}

exports.send_get_with_timeout = function(device, url, n, timeout) {
	var n_cnt = n;
	var _device = device;
	var interval = setInterval(function() {
		if (!_device.mutex) {
			_device.mutex = 1;
			http.get(url, function(res) {
					res.on('data', function(data){
						_device.mutex = 0;
					});
					res.on('error', function(data){
						_device.mutex = 0;
					});
				}).on('error', function(e) {
					_device.mutex = 0;
					simple_log("send_get_with_timeout " + _device.name +  " " + url + " error");
			});
			clearInterval(interval);
		} else {
			n_cnt -= 1;
			if (n_cnt == 0) {
				clearInterval(interval);
			}
		}
	}, timeout);
}

exports.emulate_watchdog = function(device) {

	var state_id = device.states[device.state].code;

	var query = globals.get('web_server_url') + '/watchdog' + '?'
		+ 'carrier_id[0]=' + device.carrier_id 
		+ '&device_id[0]=' + device.id
		+ '&status_id[0]=' + state_id;

	http.get(query, function(res) {
			res.on('data', function(data){
			});
			res.on('error', function(data){
			});
		}).on('error', function(e) {
			simple_log("emulating_wd " + device.name +  " " + query + " error");
	});
}

//----------------------------------------------------------------------------
// независимые функции (лучше в отдельный файл?)
//----------------------------------------------------------------------------
// сброс всего
exports.reset = function(){
	// создаём новый поток для лога
	var dir = 'log/';
	log_file.end();
	log_file = fs.createWriteStream(dir + routines.ymd_date() + 'debug.log', {flags : 'a'});
	//удаляем старые файлы лога, если нужно
	var log_files = fs.readdirSync(dir).map(function(v) { return v.toString(); }).sort();
	if (log_files.length > 5) {
		for (var i = 0; i < log_files.length-5; i++) {
			fs.unlinkSync(dir + log_files[i]);
		}
	}

	// сбрасываем параметры
	mtimers.reset();
	face.reset();
 	devices.reset();
	queue.reset();
	// удаляем старые файлы лога
	var log_files = fs.readdirSync('log');
	for (var i = 0; i < log_files.length - 2; i++) {
		fs.unlinkSync('log/' + log_files[i]);
	}

	logic.submit_event('Внутреннее событие', 'start');
}

// работа с COM - включение/выключение устройств
exports.turn_on_devices = function() {
	http.get(globals.get('web_server_url') + '/sendcom/on/all', function(res) {
		}).on('error', function(e) {
			simple_log('error sendcom on all');
	});
}

exports.turn_off_devices = function() {
	http.get(globals.get('web_server_url') + '/sendcom/off/all', function(res) {   
		}).on('error', function(e) {
			simple_log('error sendcom off all');
	});
}

// включаем проверку watchdog
exports.turn_on_wd_check = function() {
	http.get(globals.get('web_server_url') + '/game/setinterval', function(res) {
		}).on('error', function(e) {
			simple_log('error game setinterval');
	});
}

// смотрим результаты проверки wd
exports.wd_check_result = function() {
	var errors = '';
	var err_cnt = 0;
	for (var i = 0; i < devices.list.length; i++) {
		if (!devices.list[i].wd_state) {
			errors += devices.list[i].name;
			err_cnt += 1;
		}
	}
	logic.set_variable('error', "'" + errors + "'");
}
