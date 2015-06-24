var http   = require('http');

exports.send_get = function(device_name, command, parameter, enable_timer, enable_mutex) {

	var query  = devices.build_query(device_name, command, parameter);
	var device = devices.get(device_name);

	if (enable_mutex) {
		device.mutex = 1;
	}

	http.get(query, function(res) {

			if (enable_mutex) {
				device.mutex = 0;
			}

			res.on('data', function(data){

				if (enable_timer) {
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});
				}

			});
		}).on('error', function(e) {

			if (enable_mutex) {
				device.mutex = 0;
			}

			console.log(device_name +  " " + command + " error");
	});

}