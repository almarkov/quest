var express = require('express')
var http    = require('http')
var router  = express.Router()

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
dev_log('send_com_exec')
	var num;
	if (name == 'all') {
		num = 254
	} else {
		num = devices.get(name).sv_port
	}
console.log('1')
	// проверить, возможно лучше настраивать через конфиг
	if (!name.match(/terminal|audio_player|video_player/)) {
		console.log('2')
		var ee = 'sendcom.exe ' 
			+ config.port_num + ' '
			+ '255' + ' '
			+ num + ' '
			+ command;console.log(ee)
		child_process.exec(ee
			, function(error, stdout, stderr){
			simple_log('on: ' + name + ', carrier_id: ' + num)
		}).on('error', function(err){console.log(err)})
		console.log('3')
	}
	console.log('4')
}

module.exports = router