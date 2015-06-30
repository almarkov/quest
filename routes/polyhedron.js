var express = require('express');
var router = express.Router();
var http   = require('http');

// активирована подставка
router.get('/activated/:parameter', function(req, res, next) {

	devices.get('polyhedron').state = 'activated';

	// включаем видео на экране 1 прив, приготовьтесь к перелету
	helpers.send_get('video_player_1', 'play', config.video_files[4].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('video_player_1');
			device.value = config.video_files[4].alias;
			device.state = 'playing';
		},{}
	);

	//gamers.quest_state = 60; //'Подготовка к перелёту';

	res.json({success: 1});
});


// многогранник поставлен на подставку
router.get('/connected/:parameter', function(req, res, next) {

	devices.get('polyhedron').state = 'connected';
	// запускаем видео с бегущими символами
	helpers.send_get('video_player_1', 'play', config.video_files[1].value, DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			var device = devices.get('video_player_1');
			device.value = config.video_files[1].alias;
			device.state = 'playing';
		},{}
	);

	gamers.quest_state = 50; //'Ожидание, пока игроки активируют многогранник';

	res.json({success: 1});
});


// деактивирована подставка
router.get('/disconnected/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;