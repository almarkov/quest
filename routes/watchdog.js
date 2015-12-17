var express = require('express')
var http    = require('http')
var router  = express.Router()

// обработка wd от устройства
router.get('/', function(req, res, next) {
	benchmarks.add('watchdog_')
	var device_ids = req.query.di
	var status_ids = req.query.si
	var carrier_id = req.query.carrier_id
	mlog.dev('watchdog')
	mlog.dev(req.query)
	if (globals.get('enable_watchdog')) {

		for(var i = 0; i < device_ids.length; i++) {

			var device = devices.get_by_id(carrier_id, device_ids[i])
			mlog.dev(device.name)
			if (device && device.wd_enabled) {

				var old_state = device.state;

				//var state = routines.get_by_field(device.states, 'code', status_ids[i])
				var state = device.states_code_hash[status_ids[i]]
				mlog.dev(old_state)
				mlog.dev(state)
				device.state = state.name
				device.prev_state = old_state;

				device.wd_state = WATCHDOG_FAIL_TICKS_COUNT

			}
		}
	}

	res.json(SUCCESS_RESULT)

})

module.exports = router
