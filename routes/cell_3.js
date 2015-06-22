var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/code_entered/:code', function(req, res, next) {

	// прислали верный код
	if (req.params.code == gamers.codes[2]) {
		gamers.quest_state += 1;
	}

	// 5 верных кодов
	if (gamers.quest_state % 10 == 5) {
		
		gamers.quest_state = 160;//'Квест пройден';
			
	}

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;