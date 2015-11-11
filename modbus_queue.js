var http = require('http')
var PythonShell  = require('python-shell')

exports.list = []
exports.pyshell = undefined
exports.free = 1

// строим очередь заново из config
exports.reset = function() {

	mlog.dev('modbus queue reset')

	exports.list = []
	exports.free = 1

}

// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.push = function(device_name, command, parameter) {

	mlog.dev('modbus queue push')
	mlog.dev(device_name)
	mlog.dev(command)
	mlog.dev(parameter)
	console.log('modbus queue push')
	console.log(device_name)
	console.log(command)
	console.log(parameter)

	var device = devices.get(device_name)
	var query = {}
	query.url = devices.build_modbus_query(device_name, command, parameter)

	if (exports.free) {
		exports.list.free = 0
		exports.get(query, device)
	} else {
		exports.list.push(query)
	}
}

// если очередь непуста, достаём запрос и выполняем
// иначе - помечаем очередь пустой
exports.shift =  function() {

	mlog.dev('modbus queue shift')

	if (exports.list.length) {
		var query = exports.list.shift()
		exports.get(query)
	} else {
		exports.list.free = 1
	}
}

// выполняем запрос, после - сразу следующий из очереди
exports.get = function(query) {

	mlog.dev('modbus query send')
	mlog.dev(query)

	exports.pyshell = new PythonShell('my_script.py')

	exports.pyshell.send(query.url);

	exports.pyshell.on('message', function (message) {

		mlog.dev('modbus response get')
		mlog.dev(message)
		console.log(message)
		
	})

	exports.pyshell.end(function (err) {
		if (err) throw err;
		mlog.dev('modbus py ended')
		console.log('modbus py ended')
		exports.shift()
	})
}