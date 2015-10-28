var express = require('express')
var http    = require('http')
var router  = express.Router()

// обработка wd от устройства
router.get('/', function(req, res, next) {

	var device_ids = req.query.device_id
	var status_ids = req.query.status_id
	var carrier_id = req.query.carrier_id

	if (globals.get('enable_watchdog')) {

		for(var i = 0; i < device_ids.length; i++) {

			var device = devices.get_by_id(carrier_id, device_ids[i])

			if (device && device.wd_enabled) {

				var state = routines.get_by_field(device.states, 'code', status_ids[i])

				device.state = state.name

				device.wd_state = globals.get('watchdog_fail_ticks_count')

			}
		}
	}

	res.json(SUCCESS_RESULT)

})

module.exports = router
