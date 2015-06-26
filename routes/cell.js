var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	var device_name = req.baseUrl.substring(1,7);
	var code_index  = parseInt(req.baseUrl.substring(6,7)) - 1;
	// прислали верный код
	if (gamers.quest_state >= 150 && gamers.quest_state < 160) {
		if (req.params.code == gamers.codes[code_index]) {
			gamers.quest_state += 1;
			devices.get(device_name).state = 'opened';
		}

		var cell_count = 5;
		if (gamers.count < cell_count) {
			cell_count = 1 + parseInt(gamers.count);
		}
		// необходимое верных кодов
		if (gamers.quest_state % 10 == cell_count) {
			
			gamers.quest_state = 160; // игроки достали жетоны, им необходимо вставить их в статую 

		}
	}

	res.json({success: 1});
	
});

module.exports = router;