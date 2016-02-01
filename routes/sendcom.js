var express       = require('express')
var http          = require('http')
var child_process = require('child_process')
var router        = express.Router()

// включить
router.get('/on/:name', function(req, res, next) {

	send_com_exec(req.params.name, '1')

	res.json(SUCCESS_RESULT)

})

// выключить
router.get('/off/:name', function(req, res, next) {

	send_com_exec(req.params.name, '0')

	res.json(SUCCESS_RESULT)

})

// перезагрузить 
router.get('/reload/:name', function(req, res, next) {

	send_com_exec(req.params.name, '0')

	setTimeout(function () {
			send_com_exec(req.params.name, '1')
		}, 
		globals.get('device_reload_time')
	)

	res.json(SUCCESS_RESULT)

})

function send_com_exec(name, command) {

	var num
	if (name == 'all') {
		num = 254
	} else {
		num = devices.get(name).sv_port
	}

	// проверить, возможно лучше настраивать через конфиг
	if (num) {

		var exec_str = 'sendcom.exe ' 
			+ globals.get('com_port_num') + ' '
			+ '255' + ' '
			+ num + ' '
			+ command
		child_process.exec(exec_str
			, function(error, stdout, stderr){
			simple_log('on: ' + name + ', carrier_id: ' + num)
		})

	}

}

module.exports = router