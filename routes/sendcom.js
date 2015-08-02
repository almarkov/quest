var express = require('express');
var http   = require('http');
var router = express.Router();


// включить arduino 
router.get('/on/:name', function(req, res, next) {
	helpers.send_com(req.params.name, '1');
	res.json({success: 1});
});

// выключить arduino 
router.get('/off/:name', function(req, res, next) {
	helpers.send_com(req.params.name, '0');
	res.json({success: 1});
});

// перезагрузить arduino 
router.get('/reload/:name', function(req, res, next) {
	helpers.send_com(req.params.name, '0');
	setTimeout(function () {
			helpers.send_com(req.params.name, '1');
		}, helpers.get_timeout('DEVICE_RELOAD_TIME')*1000);
	}
	res.json({success: 1});
});

module.exports = router;