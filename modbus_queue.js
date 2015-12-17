var http = require('http')
var child_process = require('child_process')
var WebSocket = require('ws')

exports.list = []
exports.pyshell = undefined
exports.free = 1
exports.ws = undefined

// строим очередь заново из config
exports.reset = function() {
	benchmarks.add('modbusqueuejs_reset')
	// mlog.dev('modbus queue reset')

	exports.list = []
	exports.free = 0

	if (exports.pyshell) {
		//exports.pyshell.exit(1)
		exports.pyshell = undefined
		exports.ws = undefined
	}
	
	exports.ws = new WebSocket('ws://localhost:3030');
	//exports.pyshell.stdout.pipe(process.stdout,  { end: false });
	exports.ws.on('open', function(data) {
		exports.shift()
	});
	exports.ws.on('message', function(data, flags) {
		benchmarks.add('modbusqueuejs_ws_message')
		// mlog.dev('modbus response get')
		// mlog.dev(flags)
		// console.log('modbus response get')
		// console.log(flags)
		if (data[1] == 255) { // вочдог
			helpers.process_watchdog(data)
		}
		exports.shift()
	});
}

// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.push = function(query_str) {
	benchmarks.add('modbusqueuejs_push')
	// mlog.dev('modbus queue push')
	// mlog.dev(query_str)
	// mlog.dev(exports.list.length)

	if (exports.free == 1) {
		exports.free = 0
		exports.get(query_str)
	} else {
		exports.list.push(query_str)
	}
}

exports.unshift = function(query_str) {
	// mlog.dev('modbus_queue_unshift')
	// mlog.dev(query_str)
	// mlog.dev(exports.list.length)
	if (exports.free == 1) {
		exports.free = 0
		exports.get(query_str) 
	} else {
		exports.list.unshift(query_str)
	}
}

// если очередь непуста, достаём запрос и выполняем
// иначе - помечаем очередь пустой
exports.shift =  function() {
	benchmarks.add('modbusqueuejs_shift')
	// mlog.dev('modbus queue shift')
	// mlog.dev(exports.list.length)
	if (exports.list.length) {
		var query = exports.list.shift()
		exports.get(query)
	} else {
		exports.free = 1
	}
}

// выполняем запрос, после - сразу следующий из очереди
exports.get = function(query) {
	benchmarks.add('modbusqueuejs_get')
	// mlog.dev('modbus query send')
	// mlog.dev(query)
	// console.log('modbus query send')
	// console.log(query)

	exports.ws.send(query)
}
