var express = require('express');
var router = express.Router();
var http   = require('http');

// router.get('/stopped/:parameter', function(req, res, next) {

// 	devices.get('screen1').state = 'stop';

// 	var result = {success: 1};
// 	res.json(result);

// 	// закончилось видео приглашения на сканирование
// 	if (gamers.quest_state == 100) {

// 		//открываем дверь 3
// 		var query = devices.ext_url_for('room3_door') + "/" +  devices.get_command_id('room3_door', "open") + "/0";
// 		console.log(query);
// 		http.get(query, function(res) {

// 				console.log("Got response on opening room3_door" );
// 				res.on('data', function(data){

// 					// запускаем таймер
// 					http.get(web_server_url + "/timer/activate/" + devices.default_timer_value, function(res) {
// 							console.log("Got response on timer activation" );
// 							res.on('data', function(data){

// 								// пришёл ответ - актуализируем состояние таймера
// 								var result = JSON.parse(data);
// 								devices.timer().state = result.state.state;

// 							});
// 						}).on('error', function(e) {
// 							console.log("timer activation error: ");
// 					});

// 				});
// 			}).on('error', function(e) {
// 				console.log("room3_door activation error: ");
// 		});

// 	}
// });

router.get('/playback_finished/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;