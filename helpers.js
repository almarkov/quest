var http   = require('http')
var fs     = require('fs')

// эмуляция wd -
// сервер посылает watchdog от имени устройства самому себе
exports.emulate_watchdog = function(device) {

	var state_id = device.states[device.state].code

	var query = globals.get('web_server_url') + '/watchdog' + '?'
		+ 'carrier_id[0]=' + device.carrier_id 
		+ '&device_id[0]=' + device.id
		+ '&status_id[0]=' + state_id

	http.get(query, function(res) {
			res.on('data', function(data){
			})
			res.on('error', function(data){
			})
		}).on('error', function(e) {
	})
}

//----------------------------------------------------------------------------
// независимые функции (лучше в отдельный файл?)
//----------------------------------------------------------------------------
// сброс всего
exports.reset = function(){

	// сбрасываем параметры
	mlog.reset()
	mtimers.reset()
	face.reset()
 	devices.reset()
	queue.reset()

	// стартуем снова
	logic.submit_event('Внутреннее событие', 'start')
}

// работа с COM - включение/выключение устройств
exports.turn_on_devices = function() {
	http.get(globals.get('web_server_url') + '/sendcom/on/all', function(res) {
		}).on('error', function(e) {
	})
}

exports.turn_off_devices = function() {
	http.get(globals.get('web_server_url') + '/sendcom/off/all', function(res) {   
		}).on('error', function(e) {
	})
}

// включаем проверку watchdog
exports.turn_on_wd_check = function() {
	http.get(globals.get('web_server_url') + '/game/setinterval', function(res) {
		}).on('error', function(e) {
	})
}

// смотрим результаты проверки wd
exports.wd_check_result = function() {
	var errors = ''
	var err_cnt = 0
	for (var i = 0; i < devices.list.length; i++) {
		if (!devices.list[i].wd_state) {
			errors += devices.list[i].name
			err_cnt += 1
		}
	}
	logic.set_variable('error', "'" + errors + "'")
}