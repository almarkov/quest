//---------------------------------------------------------
// состояния устройств в текущий момент
//---------------------------------------------------------
exports.list = []
exports.list_by_name = {}
exports.list_by_id_carrier_id = {}
exports.list_by_carrier_id = {}

exports.intervalObject = null
exports.wd_interval_object = null


// переменные, которые можно сгенерить сразу после сброса
exports.modbus_state_query = undefined

exports.build_query = function(device_name, command_name, parameter) {
	benchmarks.add('devicesjs_build_query')
	var device  = exports.get(device_name)
	var command = device.commands[command_name]

	if (device.ip) {

		return "http://"
			+ device.ip + ":"
			+ device.port + "/" 
			+ device.id + "/"
			+ command.code + "/"
			+ parameter;

	} else {

		return new Buffer([
			6,                    // ожидаемая длина ответа
			0+ device.carrier_id, // carrier_id
			0+ device.id,         // device_id
			0+ command.code,      // command_id
			0+ parameter,         // param
			0,                    // crc16
			0                     // crc16
		])

	}
}

exports.build_and_exec_query = function(device_name, command_name, parameter) {
	benchmarks.add('devicesjs_build_and_exec_query')
// console.log('build_and_exec_query')
// console.log(device_name)
// console.log(command_name)
// console.log(parameter)
	var device  = exports.get(device_name)
	var command = device.commands[command_name]

	if (device.ip) {

		var str = "http://"
			+ device.ip + ":"
			+ device.port + "/" 
			+ device.id + "/"
			+ command.code + "/"
			+ parameter;

		queue.push(str, device.ip)

	} else {

		var buf = new Buffer([
			6,                    // ожидаемая длина ответа
			0+ device.carrier_id, // carrier_id
			0+ device.id,         // device_id
			0+ command.code,      // command_id
			0+ parameter,         // param
			0,                    // crc16
			0                     // crc16
		]);

		modbus_queue.push(buf)

	}
}

exports.build_modbus_query = function(device_name, command_name, parameter) {
	benchmarks.add('devicesjs_build_modbus_query')
	var device  = exports.get(device_name)
	var command = device.commands[command_name]

	return '' + device.carrier_id// carrier_id
		+ device.id        // device_id
		+ command.code     // command_id
		+ parameter        // param1
		+ '0'              // param2
		+ '0'              // crc16
		+ '0';
}

exports.build_modbus_command_query = function(device_name, command_name, parameter) {
	benchmarks.add('devicesjs_build_modbus_command_query')
	var device  = exports.get(device_name)
	var command = device.commands[command_name]

	return new Buffer([
		6,                    // ожидаемая длина ответа
		0+ device.carrier_id, // carrier_id
		0+ device.id,         // device_id
		0+ command.code,      // command_id
		0+ parameter,         // param
		0,                    // crc16
		0                     // crc16
	])
}

exports.build_modbus_state_query = function() {
	benchmarks.add('devicesjs_build_modbus_state_query')
	var i = 0
	var buffers = []
	buffers.push(new Buffer([255, 0]))

	for (var carrier_id in exports.list_by_carrier_id) {
		if (!exports.list_by_carrier_id[carrier_id].ip) {
			i += 1
			var length = exports.list_by_carrier_id[carrier_id].devices.length
			buffers.push(new Buffer([
				4+ length*2,   // ожидаемая длина ответа
				0+ carrier_id, // carrier_id
				255,           //
				0,             // crc16
				0              // crc16
			]))
		}
	}
	buffers[0][1] = i;
	return Buffer.concat(buffers, 2+i*5)
}

// сброс значений до конфига
exports.reset = function() {
	benchmarks.add('devicesjs_reset')
	exports.list_by_carrier_id = {}
	for (var i = 0; i < config.list.length; i++) {
		// копируем из config + создаём хэши для быстрого доступа
		exports.list[i] = routines.simple_copy_obj(config.list[i])
		var device = exports.list[i]

		exports.list_by_name[device.name] = device
		exports.list_by_id_carrier_id[device.carrier_id + '_' + device.id] = device
		if (exports.list_by_carrier_id[device.carrier_id]) {
			exports.list_by_carrier_id[device.carrier_id].devices.push(device);
		} else {
			exports.list_by_carrier_id[device.carrier_id] = {
				ip:      device.ip,
				port:    device.port,
				devices: [device],
			}
		}
	}

	if (exports.intervalObject) {
		clearInterval(exports.intervalObject)
	}
	if (exports.wd_interval_object) {
		clearInterval(exports.wd_interval_object)
	}
	exports.intervalObject = null
	exports.wd_interval_object = null

	exports.modbus_state_query = exports.build_modbus_state_query();
}

// устройство по имени
exports.get = function(name) {
	benchmarks.add('devicesjs_get')
	return exports.list_by_name[name];
}

// устройство по id + carrier_id
exports.get_by_id = function(carrier_id, id) {
	benchmarks.add('devicesjs_get_by_id')
	return exports.list_by_id_carrier_id[carrier_id + '_' + id];
}

// устройства по carrier_id
exports.get_by_carrier_id = function(carrier_id) {
	benchmarks.add('devicesjs_get_by_carrier_id')
	return exports.list_by_carrier_id[carrier_id];
}
