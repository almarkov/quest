var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/cooridnates_entered/:coordinates', function(req, res, next) {

	gamers.coordinates = req.params.coordinates;

	gamers.quest_state = 220;

	var result = {success: 1};
	res.json(result);
	
});

router.get('/code_enter_fail', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
	
});

//-----------------------------------------------------------------------------
// эмулятор планшета
//-----------------------------------------------------------------------------
// активирован планшет
router.get('/activate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

// деактивирован планшет
router.get('/deactivate/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});


module.exports = router;