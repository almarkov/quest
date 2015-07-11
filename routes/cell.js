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
	if (gamers.quest_state >= 150 && gamers.quest_state < 160) {
		var code_to_compare;
		if (code_index == 4) {
			code_to_compare = gamers.codes[code_index];
		//если ячейка №4
		} else if (code_index == 3) {
			//сравниваем с кодом предпоследнего игрока
			code_to_compare = gamers.codes[gamers.count-2];
		} else if (code_index >= gamers.count-2) {
			code_to_compare = gamers.codes[code_index+1];
		} else {
			code_to_compare = gamers.codes[code_index];
		}
		simple_log('comapring with ' + code_to_compare);
		if (req.params.code == code_to_compare) {
			gamers.quest_state += 1;
			helpers.send_get(device_name, 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					devices.get(device_name).state = 'opened';
				},{}
			);
		}

		var cell_count = 5;
		if (gamers.count < cell_count) {
			cell_count = 1 + (gamers.count);
		}
		// необходимое верных кодов
		if (gamers.quest_state % 10 == cell_count) {
			
			gamers.quest_state = 160; // игроки достали жетоны, им необходимо вставить их в статую 

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