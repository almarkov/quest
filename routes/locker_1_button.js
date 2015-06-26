var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка, открывающая шкаф с многогранником
router.get('/pushed/:parameter', function(req, res, next) {

	devices.get('locker_1_button').state = "pushed";

	// открываем дверь шкафа
	helpers.send_get('locker_1', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
		function (params) {
			devices.get('locker_1').state = "opened";
		},{}
	);

	gamers.quest_state = 50;//'Ожидание, пока игроки активируют многогранник';

	res.json({success: 1});
});

module.exports = router;