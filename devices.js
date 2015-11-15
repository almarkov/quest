//---------------------------------------------------------
// состояния устройств в текущий момент
//---------------------------------------------------------
exports.list = []
exports.list_by_name = {}
exports.list_by_id_arduiono_id = {}

exports.intervalObject = null

exports.build_query = function(device_name, command_name, parameter) {

	var device  = exports.get(device_name)
	var command = device.commands[command_name]

	return "http://"
		+ device.ip + ":"
		+ device.port + "/" 
		+ device.id + "/"
		+ command.code + "/"
		+ parameter;

}

exports.build_modbus_query = function(device_name, command_name, parameter) {

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

// сброс значений до конфига
exports.reset = function() {
	for (var i = 0; i < config.list.length; i++) {
		// копируем из config + создаём хэши для быстрого доступа
		exports.list[i] = routines.simple_copy_obj(config.list[i])
		var device = exports.list[i]
		exports.list_by_name[device.name] = device
		exports.list_by_id_arduiono_id[device.carrier_id + '_' + device.id] = device
	}

	if (exports.intervalObject) {
		clearInterval(exports.intervalObject)
	}
	exports.intervalObject = null

}

// устройство по имени
exports.get = function(name) {
	return exports.list_by_name[name];
}

// устройство по id + carrier_id
exports.get_by_id = function(carrier_id, id) {
	return exports.list_by_id_arduiono_id[carrier_id + '_' + id];
}
