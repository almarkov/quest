var express = require('express');
var router = express.Router();
var http   = require('http');

// активирован планшет
router.get('/activate', function(req, res, next) {

	devices._personal_code_pad.state = 'active';

	var result = {success: 1, state: devices._personal_code_pad};
	res.json(result);
});

// деактивирован планшет
router.get('/deactivate', function(req, res, next) {

	devices._personal_code_pad.state = 'idle';

	var result = {success: 1, state: devices._personal_code_pad};
	res.json(result);
});

module.exports = router;