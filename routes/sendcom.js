var express = require('express');
var http   = require('http');
var router = express.Router();
var child_process = require('child_process');

// включить arduino 
router.get('/on/:name', function(req, res, next) {
	var num;
	var name = req.params.name;
	if (name == 'all') {
		num = 254;
	} else {
		num = devices.get(name).carrier_id;
	}

	if (!name.match(/terminal|audio_player|video_player/)) {
		child_process.exec('sendcom.exe ' 
			+ config.port_num + ' '
			+ '255' + ' '
			+ num + ' '
			+ '1'
			, function(error, stdout, stderr){
			simple_log('on: ' + name + ', carrier_id: ' + num);
		});
	}
	
	res.json({success: 1});
});

// выключить arduino 
router.get('/off/:name', function(req, res, next) {
	var num;
	var name = req.params.name;
	if (name == 'all') {
		num = 254;
	} else {
		num = devices.get(name).carrier_id;
	}
	if (!name.match(/terminal|audio_player|video_player/)) {
		child_process.exec('sendcom.exe '
			+ config.port_num + ' '
			+ '255' + ' '
			+ num + ' '
			+ '0'
			, function(error, stdout, stderr){
			simple_log('off: ' + name + ', carrier_id: ' + num);
		});
	}
	res.json({success: 1});
});

// перезагрузить arduino 
router.get('/reload/:name', function(req, res, next) {
	var num;
	var name = req.params.name;
	if (name == 'all') {
		num = 254;
	} else {
		num = devices.get(name).carrier_id;
	}
	if (!name.match(/terminal|audio_player|video_player/)) {
		child_process.exec('sendcom.exe '
			+ config.port_num + ' '
			+ '255' + ' '
			+ num + ' '
			+ '0'
			, function(error, stdout, stderr){
			simple_log('off: ' + name + ', carrier_id: ' + num);
		});
		setTimeout(function () {
			child_process.exec('sendcom.exe ' 
				+ config.port_num + ' '
				+ '255' + ' '
				+ num + ' '
				+ '1'
				, function(error, stdout, stderr){
				simple_log('on: ' + name + ', carrier_id: ' + num);
			});
		}, helpers.get_timeout('DEVICE_RELOAD_TIME')*1000);
	}
	res.json({success: 1});
});

module.exports = router;