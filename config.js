var xlsx = require('node-xlsx')

// список устройств
exports.list = []

exports.load = function() {
	//benchmarks.add('configjs_load')
	var obj = xlsx.parse('config.xlsx')
	var data = obj[0].data

	var fields = [
		'no',            // №
		'title',         // "Название устройства в веб-интерфейсе"
		'name',          // "Название устройства в коде"
		'ip',            // "IP"
		'port',          // "Port"
		'carrier_id',    // "Carrier ID"
		'id',            // "Onboard ID"
		'wd',            // "WD"
		'position',      // "расположение"
		'has_value',     // "есть значение для ввода"
		'command_code',  // "ID команды"
		'command_name',  //     "Название команды"
		'command_title', //     "Название командыв веб-интерфейсе"
		'command_param', //     "Параметр команды"
		'event_code',    // "ID рапорта"
		'event_name',    //     "Название рапорта"
		'event_title',   //     "Название рапорта в веб-интерфейсе"
		'event_param',   //     "Параметр рапорта"
		'event_src_st',  //     "Исходное состояние устройства для рапорта"
		'event_dst_st',  //     "Конечное состояние устройства для рапорта"
		'state_code',    // "ID состояния"
		'state_name',    //     "Название состояния в коде"
		'state_title',   //     "Название состояния в веб-интерфейсе"
	]

	var start_line = 3// пропускаем заголовки
	for (var i = start_line; i < data.length; i++) {
		var line = data[i]

		var item  = {}
		var last_item
		for (var j = 0; j < fields.length; j++) {
			if (fields[j].match(/name|event_src_st|event_dst_st/) && line[j] ) {
				item[fields[j]] = line[j].replace(' ', '_').toLowerCase()
			} else {
				item[fields[j]] = line[j]
			}
		}
		if (item.no) {
			last_item = {
				id:         item.id,
				carrier_id: item.carrier_id,
				name:       item.name,
				title:      item.title,
				ip:         item.ip || '',
				port:       item.port || 3000,
				state:      'undef',
				prev_state: 'undef',
				wd_state:   WATCHDOG_FAIL_TICKS_COUNT,
				sv_port:    0,
				position:   {
					column: item.position,
				},
				value:      '',
				prev_value: '',
				commands:   {},
				commands_code_hash: {},
				events:     {},
				events_code_hash: {},
				states:     {
					undef: {
						code:  -1,
						name:  'undef',
						title: 'не определён'
					},
				},
				states_code_hash: {},
				has_value:  item.has_value && item.has_value == 1 ? 1 : 0,
			}
			switch (item.wd){
				case 2:
					last_item.wd_emulate = 1
					last_item.wd_enabled = 1
					break;
				case 1:
					last_item.wd_emulate = 0
					last_item.wd_enabled = 1
					break;
				case 0:
				default:
					last_item.wd_emulate = 0
					last_item.wd_enabled = 0
					break;

			}
			exports.list.push(last_item)
		}
		if (typeof item.command_code !== 'undefined') {
			last_item.commands[item.command_name] = {
				code:   item.command_code,
				name:   item.command_name,
				title:   item.command_name,
			}
			if (item.command_title) {
				last_item.commands[item.command_name].title = item.command_title
				last_item.commands[item.command_name].has_button = 1
				last_item.commands[item.command_name].button = {
					confirm: globals.get('enable_buttons_confirm'),
				}
			}
		}
		if (typeof item.event_code !== 'undefined') {
			last_item.events[item.event_name] = {
				code:   item.event_code,
				name:   item.event_name,
			}
			if (item.event_title) {
				last_item.events[item.event_name].title = item.event_title
				last_item.events[item.event_name].has_button = 1
				var params
				if (item.event_param) {
					params = item.event_param.split(',')
				}
				last_item.events[item.event_name].button = {
					confirm:   globals.get('enable_buttons_confirm'),
					parameter: item.event_param ? params[1] : undefined, 
				}
				last_item.events[item.event_name].event_src_st = item.event_src_st
				last_item.events[item.event_name].event_dst_st = item.event_dst_st
			}
		}
		if (typeof item.state_code !== 'undefined') {
			last_item.states[item.state_name] = {
				code:   item.state_code,
				name:   item.state_name,
				title:  item.state_title,
			}
		}
	}

	// создаём хэши для каждого устройства
	// для быстрого доступа к событиям, командам и состояниям
	exports.list.forEach(function(device){
		for(var event_name in device.events) {
			var event_ = device.events[event_name]
			device.events_code_hash[event_.code] = event_
		}
		for(var command_name in device.commands) {
			var command = device.commands[command_name]
			device.commands_code_hash[command.code] = command
		}
		for(var state_name in device.states) {
			var state = device.states[state_name]
			device.states_code_hash[state.code] = state
		}
	})
}
