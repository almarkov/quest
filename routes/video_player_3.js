var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	res.json({success: 1});
});
router.get('/stop/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;