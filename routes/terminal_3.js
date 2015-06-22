var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/game_passed/:code', function(req, res, next) {
	//  открываем дверь 7
	var query = devices.build_query('door_7', 'open', '0');
	devices.get('door_7').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_7').mutex = 0;
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
			devices.get('door_7').mutex = 0;
			console.log("door_7 close error: ");
	});
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});


module.exports = router;