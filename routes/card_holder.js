var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/given/:parameter', function(req, res, next) {

	devices.get('card_holder').state = "given";

	gamers.quest_state = 170; // Игроки получили ключ от двери в коридор

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор кардхолдера
//-----------------------------------------------------------------------------
router.get('/give/:parameter', function(req, res, next) {
	res.json({success: 1});
});
router.get('/take/:parameter', function(req, res, next) {
	res.json({success: 1});
});



module.exports = router;