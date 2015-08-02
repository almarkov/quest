var http   = require('http');
var child_process = require('child_process');

exports.send_get = function(device_name, command, parameter, enable_timer, enable_mutex, cb, params) {

	simple_log('-> ' + device_name + ' ' + command + ' ' + parameter);

	var query  = devices.build_query(device_name, command, parameter);
	var device = devices.get(device_name);

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
