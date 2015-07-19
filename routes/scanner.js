var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка 'сканировать''
router.get('/start', function(req, res, next) {

	// закрываем дверь №2
	gamers.active_button = '';
	helpers.send_get('door_2', 'close', '0', helpers.get_timeout('T2'), ENABLE_MUTEX);

	res.json({success: 1});
});

// нажата кнопка 'закончить сканирование''
router.get('/stop', function(req, res, next) {

	// если не предпоследний
	if (gamers.quest_state % 10 != gamers.count-2) {
		// гасим планшет
		// helpers.send_get('terminal_1', 'deactivate', '0', DISABLE_TIMER, ENABLE_MUTEX,
		// 	function (params) {
		// 		devices.get('terminal_1').state = "sleep";
		// 	},{}
		// );

		// закрываем дверь №4
		helpers.send_get('door_4', 'close', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);

		gamers.active_button = "";

		res.json({success: 1});
	}
	// если предпоследний
	if (gamers.quest_state % 10 == gamers.count-2) {
		// закрываем дверь 3
		helpers.send_get('door_3', 'close', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);

		gamers.active_button = "";

		res.json({success: 1});
	}
});

// нажата кнопка 'закончить процедуру сканирование''
router.get('/stop_all', function(req, res, next) {

	gamers.quest_state = 142;//Все игроки снова собрались вместе и приглашаются во дворец благоденствия»

	// закрываем дверь 4
	helpers.send_get('door_4', 'close', '0', ENABLE_TIMER, ENABLE_MUTEX);

	res.json({success: 1});
});

module.exports = router;