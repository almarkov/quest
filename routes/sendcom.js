var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');

// включить arduino 
router.get('/on/:name', function(req, res, next) {
	var num;
	if (req.params.name == 'all') {
		num = 254;
	} else {
		num = devices.get(req.params.name).carrier_id;
	}
	child_process.exec('sendcom.exe ' + config.port_num + ' ' + num + ' 1', function(error, stdout, stderr){
		simple_log('on: ' + req.params.name + ', carrier_id: ' + num);
	});
	
	res.json({success: 1});
});

// выключить arduino 
router.get('/off/:name', function(req, res, next) {
	var num;
	if (req.params.name == 'all') {
		num = 254;
	} else {
		num = devices.get(req.params.name).carrier_id;
	}
	child_process.exec('sendcom.exe ' + config.port_num + ' ' + num + ' 0', function(error, stdout, stderr){
		simple_log('off: ' + req.params.name + ', carrier_id: ' + num);
	});
	res.json({success: 1});
});

// перезагрузить arduino 
router.get('/reload/:name', function(req, res, next) {
	var num;
	if (req.params.name == 'all') {
		num = 254;
	} else {
		num = devices.get(req.params.name).carrier_id;
	}
	child_process.exec('sendcom.exe ' + config.port_num + ' ' + num + ' 2', function(error, stdout, stderr){
		simple_log('off: ' + req.params.name + ', carrier_id: ' + num);
	});
	res.json({success: 1});
});

module.exports = router;