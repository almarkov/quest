//---------------------------------------------------------
// состояния устройств в текущий момент
//---------------------------------------------------------

var simple_copy_obj = function(obj) {
	var new_obj = {};
	for (var k in obj) {
		new_obj[k] = obj[k];
	}
	return new_obj;
}

exports.list = [];
exports.list_by_name = {};
exports.list_by_id_arduiono_id = {};
exports.list_by_carrier_id = {};

exports.intervalObject = null;

exports.ext_url_for = function (object_name) {
	for (var i = 0; i < config.list.length; i++) {
		if (config.list[i].name == object_name) {
			return "http://" + config.list[i].ip + ":" + config.list[i].port + "/" + config.list[i].id;
		}
	}
}

exports.get_redirect_url = function (ip, device_id, command_id) {
	dev_log('get_redirect_url')
	var res = "";
	if (device_id == 255) {
		return "/wd/0";
	} else {
		config.list.forEach(function function_name (element) {
			if (element.ip == ip && element.id == device_id) {
				res = "/" + element.name;
				res += "/" + routines.get_by_field(element.commands, 'code', command_id).name;
			}
		});
	}
	return res;
}

exports.build_query = function(device_name, command_name, parameter) {

	if (device_name == 'timer') {
		return globals.get('web_server_url') + '/timer/'+ command_name + '/' + parameter;
	}
	if (REAL_MODE) {
		console.log(device);
		var device  = exports.get(device_name);
		var command = device.commands[command_name];

		return "http://"
			+ device.ip + ":"
			+ device.port + "/" 
			+ device.id + "/"
			+ command.code + "/"
			+ parameter;

	}
	if (EMULATOR_MODE) {
		return globals.get('web_server_url') + '/' + device_name + '/'+ command_name + '/' + parameter;
	}
}

exports.int_url_for = function (carrier_id, device_id, event_id) {
	var res = "";
	config.list.forEach(function function_name (element) {
		if (element.carrier_id == carrier_id && element.id == device_id) {
			res =  "/" + element.name;
			res += "/" + routines.get_by_field(element.events, 'code', event_id).name;
		}
	});
	return res;
}

// сброс значений до конфига
exports.reset = function() {
	for (var i = 0; i < config.list.length; i++) {
		// копируем из config + создаём хэши для быстрого доступа
		exports.list[i] = simple_copy_obj(config.list[i]);
		exports.list[i].mutex = 0;
		exports.list_by_name[exports.list[i].name] = exports.list[i];
		exports.list_by_id_arduiono_id[exports.list[i].carrier_id + '_' + exports.list[i].id] = exports.list[i];
		if (exports.list_by_carrier_id[exports.list[i].carrier_id]) {

		} else {
			exports.list_by_carrier_id[exports.list[i].carrier_id] = [];
		}
		exports.list_by_carrier_id[exports.list[i].carrier_id].push(exports.list[i]);

	}
	exports.default_timer_value = config.default_timer_value;

	if (exports.intervalObject) {
		clearInterval(exports.intervalObject);
	}
	exports.intervalObject = null;

}

// таймер
exports.timer = function() {
	return exports.list[0];
}

// устройство по имени
exports.get = function(name) {
	return exports.list_by_name[name];
}

// устройство по id + carrier_id
exports.get_by_id = function(carrier_id, id) {
	return exports.list_by_id_arduiono_id[carrier_id + '_' + id];
}
