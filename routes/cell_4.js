var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	// прислали верный код
	if (gamers.quest_state >= 150 && gamers.quest_state < 160) {
		if (req.params.code == gamers.codes[3]) {
			gamers.quest_state += 1;
			devices.get('cell_4').state = 'opened';
		}

		var cell_count = 5;
		if (gamers.count < cell_count) {
			cell_count = 1 + parseInt(gamers.count);
		}
		// 5 верных кодов
		if (gamers.quest_state % 10 == cell_count) {
			
			gamers.quest_state = 160;//'Квест пройден';

		}
	}

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;