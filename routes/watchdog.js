var express = require('express');
var http   = require('http');
var router = express.Router();

// обработка wd от устройства
router.get('/', function(req, res, next) {

	var device_ids = req.query.device_id;
	var status_ids = req.query.status_id;
	var carrier_id = req.query.carrier_id;

	if (config.watchdog_enabled) {

		for(var i = 0; i < device_ids.length; i++) {
			var device = devices.get_by_id(carrier_id, device_ids[i]);
			if (device && device.wd_enabled) {

				// в отдельную функцию
				for (var state in device.states) {
					if (state.code == status_ids[i]) {
						device.state = state.name;
						simple_log('set state by watchdog:' + state.name);
						break;
					}
				}
				//device.state = device.states[status_ids[i]];			
				device.wd_state = 3;
			}
		}

	}

	res.json({success: 1});

});

module.exports = router;
