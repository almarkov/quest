var http   = require('http');
var child_process = require('child_process');

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

exports.send_com = function(name, command) {
	var num;
	if (name == 'all') {
		num = 254;
	} else {
		num = devices.get(name).sv_port;
	}


	if (!name.match(/terminal|audio_player|video_player/)) {
		child_process.exec('sendcom.exe ' 
			+ config.port_num + ' '
			+ '255' + ' '
			+ num + ' '
			+ command
			, function(error, stdout, stderr){
			simple_log('on: ' + name + ', carrier_id: ' + num);
		});
	}
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

	//!!!!!! в отдельную ф-цию (поменять simple_copy device - объект на базе config)
	var state_id = 0;
	for (var i = 0; i < device.states.length; i++) {
		if (device.states[i] == device.state) {
			state_id = i;
			break;
		}
	} 
	var query = config.web_server_url + '/watchdog' + '?'
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

// работа с COM - включение/выключение устройств
exports.turn_on_devices = function() {
	http.get(config.web_server_url + '/sendcom/on/all', function(res) {
		}).on('error', function(e) {
			simple_log('error sendcom on all');
	});
}

exports.turn_off_devices = function() {
	http.get(config.web_server_url + '/sendcom/off/all', function(res) {   
		}).on('error', function(e) {
			simple_log('error sendcom off all');
	});
}

// вкючаем проверку watchdog
exports.turn_on_wd_check = function() {
	http.get(config.web_server_url + '/game/setinterval', function(res) {
		}).on('error', function(e) {
			simple_log('error game setinterval');
	});
}