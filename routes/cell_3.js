var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	// прислали верный код
	if (req.params.code == gamers.codes[0]) {
		gamers.quest_state += 1;
		devices.get('cell_3').state = 'opened';
	}

	var cell_count = 5;
	if (gamers.count < cell_count) {
		cell_count = gamers.count;
	}
	// 5 верных кодов
	if (gamers.quest_state % 10 == cell_count) {
		
		gamers.quest_state = 160;//'Квест пройден';

	}

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;