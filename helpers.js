var http   = require('http');

exports.send_get = function(device, command, parameter, enable_timer, enable_mutex) {
	var query = devices.build_query(device, command, parameter);
	devices.get('door_1').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_1').mutex = 0;
			res.on('data', function(data){

				// запускаем таймер
				http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
						res.on('data', function(data){
							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices.get('timer').state = result.state.state;
						});
					}).on('error', function(e) {
						console.log("timer activate error: ");
				});

			});
		}).on('error', function(e) {
			devices.get('door_1').mutex = 0;
			console.log("door_1 open error: ");
	});

}