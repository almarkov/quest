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

// копируем из config + создаём хэши для быстрого доступа
for (var i = 0; i < config.list.length; i++) {
	exports.list[i] = simple_copy_obj(config.list[i]);
	exports.list[i].mutex = 0;
}

exports.default_timer_value = config.default_timer_value;

exports.ext_url_for = function (object_name) {
	for (var i = 0; i < config.list.length; i++) {
		if (config.list[i].name == object_name) {
			return "http://" + config.list[i].ip + ":" + config.list[i].port + "/" + config.list[i].id;
		}
	}
}

exports.get_redirect_url = function (ip, device_id, command_id) {
	var res = "";
	if (device_id == 255) {
		return "/wd/0/0";
	} else {
		config.list.forEach(function function_name (element) {
			if (element.ip == ip && element.id == device_id) {
				res = "/" + element.name;
				res += "/" + element.commands[command_id];
			}
		});
	}
	return res;
}

exports.build_query = function(device, command, parameter) {
	if (device == 'timer') {
		return web_server_url + '/timer/'+ command + '/' + parameter;
	}
	for (var i = 0; i < config.list.length; i++) {
		if (config.list[i].name == device) {
			for (var j = 0; j < config.list[i].commands.length; j++) {
				if (command == config.list[i].commands[j]) {
					return "http://"
						+ config.list[i].ip + ":"
						+ config.list[i].port + "/" 
						+ config.list[i].id + "/"
						+ parseInt(j) + "/"
						+ parameter;
				}
			}
		}
	}
}

exports.int_url_for = function (arduino_id, device_id, event_id) {
	var res = "";
	config.list.forEach(function function_name (element) {
		if (element.arduino_id == arduino_id && element.id == device_id) {
			res =  "/" + element.name;
			res += "/" + element.events[event_id];
		}
	});
	return res;
	
}

// сброс значений до конфига
exports.reset = function() {
	for (var i = 0; i < config.list.length; i++) {
		exports.list[i] = simple_copy_obj(config.list[i]);
		exports.list[i].mutex = 0;
	}
}

// таймер
exports.timer = function() {
	return exports.list[0];
}

// устройство по имени
exports.get = function(name) {
	for (var i = 0; i < exports.list.length; i++) {
		if (exports.list[i].name == name) {
			return exports.list[i];
		}
	}
}

// устройство по id + arduino_id
exports.get_by_id = function(arduino_id, id) {
	for (var i = 0; i < exports.list.length; i++) {
		if (exports.list[i].arduino_id == arduino_id && exports.list[i].id == id) {
			return exports.list[i];
		}
	}
}

exports.get_command_id = function(device, command){
	if (command == 'wd') {
		return 255;
	}
	for (var i = 0; i < exports.list.length; i++) {
		if (device == exports.list[i].name) {
			for (var j = 0; j < exports.list[i].commands.length; j++) {
				if (command == exports.list[i].commands[j]) {
					return j;
				}
			}
		}
	}
};