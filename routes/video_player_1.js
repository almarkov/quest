var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_1').state = 'stopped';

	// закончилось видео приглашения на сканирование
	if (gamers.quest_state == 90) {

		//открываем дверь 2
		helpers.send_get('door_2', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

		gamers.quest_state = 100; // Приглашение на сканирование

	// закончилось видео 
	} else if (gamers.quest_state == 200) {
		// пробуждаем планшет-координаты
		helpers.send_get('terminal_4', 'activate', "0", DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('terminal_4').state = 'active';
			},{}
		);

		gamers.quest_state = 210;//вводят координаты
	}
	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;