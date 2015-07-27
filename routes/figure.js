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

	var cell_count = gamers.count + 1;

	if (gamers.game_state == 'gamers_opened_cells'
		&& cell_count <= parseInt(req.params.value)) {
		
		gamers.game_state = 'gamers_opened_cube_with_RFID';
		// открываем шкаф с картой
		helpers.send_get('locker_2', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('locker_2').state = "opened";
			},{}
		);

		// закрываем ячейки
		for (var i = 1; i <= 5; i++) {
			helpers.send_get('cell_' + i, 'close', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					var device = devices.get('cell_' + params.index);
					device.state = 'closed';
				}, 
				{
					index: i
				}
			);
		}

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
	}
});

//-----------------------------------------------------------------------------
// эмуляция фигуры
//-----------------------------------------------------------------------------
router.get('/calibrate/:param', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;