var http   = require('http');

exports.send_get = function(device_name, command, parameter, enable_timer, enable_mutex, cb, params) {

	simple_log('-> ' + device_name + ' ' + command + ' ' + parameter);

	var query  = devices.build_query(device_name, command, parameter);
	var device = devices.get(device_name);

	if (enable_mutex) {
		device.mutex = 1;
	}

	http.get(query, function(res) {

			if (enable_mutex) {
				device.mutex = 0;
			}

			if (enable_timer) {
				res.on('data', function(data){
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							simple_log("timer activate error: ");
					});
				});
			} 
			if (cb) {
				cb(params || {});
			}
		}).on('error', function(e) {

			if (enable_mutex) {
				device.mutex = 0;
			}
			simple_log(device_name +  " " + command + " error");
			simple_log(e);
	});
}
