var express = require('express');
var router = express.Router();
var http   = require('http');
//var devices = require('./devices.js');

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// передача модели в GUI
	var result = devices;

	var str = gamers.quest_states[gamers.quest_state];
	if (gamers.quest_state > 110 && gamers.quest_state < 120) {
		str += ' ' + parseInt(gamers.count - gamers.quest_state % 10) + ' человек';
	}

	result.quest_state = str;

	res.json(result);

});

module.exports = router;