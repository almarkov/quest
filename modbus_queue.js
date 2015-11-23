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
exports.push = function(query_str) {

	mlog.dev('modbus queue push')
	mlog.dev(query_str)
	mlog.dev(exports.free)

	console.log('modbus queue push')
	console.log(query_str)
	console.log(exports.free)

	if (exports.free == 1) {
		exports.free = 0
		exports.get(query_str)
	} else {
		exports.list.push(query_str)
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
	console.log('modbus query send')
	console.log(query)

	exports.pyshell = new PythonShell('request.py', {mode: 'binary', pythonOptions: ['-u']})

	exports.pyshell.send(query);

	exports.pyshell.stdout.on('data', function (data) {

		mlog.dev('modbus response get')
		mlog.dev(data)
		console.log('modbus response get')
		console.log(data)
		if (data[1] == 255) { // вочдог
			helpers.process_watchdog(data)	
		}
		
	})

	exports.pyshell.end(function (err) {
		if (err) throw err;
		mlog.dev('request.py ended')
		console.log('request.py ended')
		exports.shift()
	})
}
