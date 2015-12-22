var http   = require('http')
var fs     = require('fs')

exports.process_watchdog = function(data) {
	// benchmarks.add('helpersjs_process_watchdog')
	// console.log('process_watchdog')
	// console.log(data)
	// mlog.dev('process_watchdog')
	// mlog.dev(data)

	var carrier_id_index = 0

	while ((carrier_id_index < data.length) && data[carrier_id_index]) {

		var carrier_id = '' + data[carrier_id_index]
		if (carrier_id) {
			var carrier = devices.get_by_carrier_id(carrier_id)
			if (carrier) {
				var devices_length = carrier.devices.length

				var calc_crc_word = routines.get_crc(data, carrier_id_index, carrier_id_index + devices_length*2 + 2 )
				mlog.dev('calculated_crc_word');
				mlog.dev(calc_crc_word);

				var watchdog_crc_word = (data[carrier_id_index + devices_length*2 + 2] << 8) + data[carrier_id_index + devices_length*2 + 3]
				mlog.dev('watchdog_crc_word');
				mlog.dev(watchdog_crc_word);

				for (i = 0; i < devices_length; i++ ) {
					
					var device = carrier.devices[i]
					var old_state = device.state
					var old_value = device.value

					var state = device.states_code_hash['' + data[2 + carrier_id_index + i*2]];
					if (state) {
						var new_state = state.name
						var new_value  = data[3 + carrier_id_index + i*2]

						if (device.events) {
							for (var name in device.events) {
								var event_ = device.events[name]
								if (
									((event_.event_src_st == old_state) || (event_.event_src_st == '*'))
									&& ((event_.event_dst_st == new_state) || (event_.event_dst_st == '*'))
									) {

									logic.submit_event('Рапорт устройства', '' + device.name + '/' + event_.name, new_value.toString())
								}
							}
						}

						device.state = new_state
						device.value = new_value
						device.prev_state = old_state
						device.prev_value = old_value
						device.wd_state = WATCHDOG_FAIL_TICKS_COUNT
					}
				}
			}
		} else {
		}

		carrier_id_index += devices_length*2 + 4
	}

}

// эмуляция wd -
// сервер посылает watchdog от имени устройства самому себе
exports.emulate_watchdog = function(device) {
	//benchmarks.add('helpersjs_emulate_watchdog')
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
	//benchmarks.add('helpersjs_reset')
	// сбрасываем параметры
	mlog.reset()
	mtimers.reset()
	face.reset()
 	devices.reset()
	queue.reset()
	modbus_queue.reset()

	// стартуем снова
	logic.submit_event('Внутреннее событие', 'start')
}

// работа с COM - включение/выключение устройств
exports.turn_on_devices = function() {
	//benchmarks.add('helpersjs_turn_on_devices')
	http.get(globals.get('web_server_url') + '/sendcom/on/all', function(res) {
		}).on('error', function(e) {
	})
}

exports.turn_off_devices = function() {
	//benchmarks.add('helpersjs_turn_off_devices')
	http.get(globals.get('web_server_url') + '/sendcom/off/all', function(res) {   
		}).on('error', function(e) {
	})
}

// включаем проверку watchdog
exports.turn_on_wd_check = function() {
	//benchmarks.add('helpersjs_turn_on_wd_check')
	http.get(globals.get('web_server_url') + '/game/setinterval', function(res) {
		}).on('error', function(e) {
	})
}

// смотрим результаты проверки wd
exports.wd_check_result = function() {
	//benchmarks.add('helpersjs_wd_check_result')
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
