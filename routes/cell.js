var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/code_entered/:code', function(req, res, next) {

	res.json({success: 1});

	var device_name = req.baseUrl.substring(1,7);
	var code_index  = parseInt(req.baseUrl.substring(6,7)) - 1;
	// прислали верный код
	if (gamers.game_state  == 'gamers_opening_cells') {
		var index_to_cmp;
		if (code_index == 4) {
			//code_to_compare = gamers.codes[code_index];
			index_to_cmp = code_index;
		//если ячейка №4
		} else if (code_index == 3) {
			//сравниваем с кодом предпоследнего игрока
			//code_to_compare = gamers.codes[gamers.count-2];
			index_to_cmp = gamers.count-2;
		} else if (code_index >= gamers.count-2) {
			//code_to_compare = gamers.codes[code_index+1];
			index_to_cmp = code_index+1;
		} else {
			//code_to_compare = gamers.codes[code_index];
			index_to_cmp = code_index;
		}
		var code_to_cmp = gamers.codes[index_to_cmp];
		simple_log('comparing with ' + code_to_cmp);
		if (req.params.code == code_to_cmp) {
			gamers.codes[index_to_cmp] = '(v)' + gamers.codes[index_to_cmp]; 
			var player_num = parseInt(gamers.game_states['gamers_opening_cells'].arg) + 1;
			gamers.game_states['gamers_opening_cells'].arg = player_num.toString();
			helpers.send_get(device_name, 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					devices.get(device_name).state = 'opened';
				},{}
			);
		}

		var cell_count = 1 + gamers.count;
		// необходимое верных кодов
		if (player_num == cell_count) {
			
			gamers.game_state = 'gamers_opened_cells'; // игроки достали жетоны, им необходимо вставить их в статую

			// включаем подсветку статуи
			// helpers.send_get('figure', 'backlight_on', '0', DISABLE_TIMER, ENABLE_MUTEX,
			// 	function(params){
			// 	}, {}
			// );

		}
	}
});

//-----------------------------------------------------------------------------
// эмулятор ячейки
//-----------------------------------------------------------------------------
router.get('/open/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/close/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;