var express = require('express')
var http    = require('http')
var router  = express.Router();


// запуск GUI
router.get('/', function(req, res, next) {
	benchmarks.add('indexjs_')
	res.render('index', {web_server_url: globals.get('web_server_url'), web_ui_refresh_time: globals.get('web_ui_refresh_time') })
})

// редирект по обработчикам событий от устройств
router.get('/:carrier_id/:device_id/:action/:parameter', function(req, res, next) {
	benchmarks.add('indexjs_withparams')
	// если первый параметр - не число, то это не событие от устройства, передаём следующему обработчику
	if (isNaN(parseInt(req.params.carrier_id))) {
		next()
		return
	}

	res.send(1)

	var device  = devices.get_by_id(req.params.carrier_id, req.params.device_id)
	if (device) {

		var event_ = routines.get_by_field(device.events, 'code', req.params.action)
		var event_ = device.events_code_hash[req.params.action]
		if (event_) {

			logic.submit_event('Рапорт устройства', device.name + '/' + event_.name, req.params.parameter)

		} else {
			// mlog.simple('Событие от устройства не обработано: не найдено событие устройства ' + device.name
			// 		+ ' с code=' + req.params.action
			// )
			// mlog.dev('Событие от устройства не обработано: не найдено событие устройства ' + device.name
			// 		+ ' с code=' + req.params.action
			// )
		}

	} else {
		// mlog.simple('Событие от устройства не обработано: не найдено устройство' +
		// 			+ ' с carrier_id=' + req.params.carrier_id
		// 			+ ' и device_id=' + req.params.device_id
		// )
		// mlog.dev('Событие от устройства не обработано: не найдено устройство' +
		// 			+ ' с carrier_id=' + req.params.carrier_id
		// 			+ ' и device_id=' + req.params.device_id
		// )
	}

})

module.exports = router
