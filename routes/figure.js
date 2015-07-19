var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/number_of_inserted/:value', function(req, res, next) {
	res.json({success: 1});
	var figure = devices.get('figure');

	figure.state = "number_of_inserted";
	figure.value = req.params.value;

	var count = 5;
	if (gamers.count < count) {
		count = gamers.count;
	}

	if (count <= parseInt(req.params.value)) {
		// открываем шкаф с картой
		helpers.send_get('locker_2', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('locker_2').state = "opened";
			},{}
		);

		// включаем дым-машину
		helpers.send_get('smoke', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function(params){
				devices.get('smoke').state = 'on';
			}, {}
		);
		// и выключаем через T4
		setTimeout(function () {
			helpers.send_get('smoke', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					devices.get('smoke').state = 'off';
				}, {}
			);
		}, helpers.get_timeout('T4')*1000);

		gamers.quest_state = 170; // Игроки получили ключ от двери в коридор
	}
});

//-----------------------------------------------------------------------------
// эмуляция фигуры
//-----------------------------------------------------------------------------
router.get('/calibrate/:param', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;