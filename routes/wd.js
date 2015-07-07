var express = require('express');
var http   = require('http');
var router = express.Router();

// wd
router.get('/:param1/:param2', function(req, res, next) {
	var result = {'success': 1, 'carrier_id': 144,  'onboard_devices': []};
	res.json(result);
});

module.exports = router;