var express = require('express');
var router = express.Router();
var http   = require('http');

// активирована подставка
router.get('/activated/:parameter', function(req, res, next) {

	devices.get('polyhedron').state = 'activated';

	//выключаем свет
	var query = devices.build_query('light', 'off', '0');
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('light').state = "off";

			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	// включаем видео на экране 2
	// var query = devices.build_query('video_player_2', 'play', config.files[2]);
	// http.get(query, function(res) {
	// 		console.log("Got response: " );
	// 		res.on('data', function(data){

	// 			devices.get('video_player_2').state = "playing";
	// 			devices.get('video_player_2').value = config.files[2];
				
	// 		});
	// 	}).on('error', function(e) {
	// 		console.log("Got error: ");
	// });

	// включаем видео на экране 1 прив, приготовьтесь к перелету
	var query = devices.build_query('video_player_1', 'play', config.files[3]);
	devices.get('video_player_1').mutex = 1;
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){
				devices.get('video_player_1').mutex = 0;
				devices.get('video_player_1').state = "playing";
				devices.get('video_player_1').value = config.files[3];
				
			});
		}).on('error', function(e) {
			devices.get('video_player_1').mutex = 0;
			console.log("Got error: ");
	});

	gamers.quest_state = 60; //'Подготовка к перелёту';

	var result = {success: 1};
	res.json(result);
});


// многогранник поставлен на подставку
router.get('/connected/:parameter', function(req, res, next) {

	devices.get('polyhedron').state = 'connected';
	// запускаем видео с бегущими символами
	var query = devices.build_query('video_player_1', 'play', config.files[23]);
	devices.get('video_player_1').mutex = 1;
	http.get(query, function(res) {
			res.on('data', function(data){
				devices.get('video_player_1').mutex = 0;
				devices.get('video_player_1').value = config.files[23];
				devices.get('video_player_1').state = "playing";	
			});
		}).on('error', function(e) {
			devices.get('video_player_1').mutex = 0;
			console.log("video_player_1 play_channel_1 error: ");
	});

	gamers.quest_state = 50; //'Ожидание, пока игроки активируют многогранник';

	var result = {success: 1};
	res.json(result);
});


// деактивирована подставка
router.get('/disconnected/:parameter', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

module.exports = router;