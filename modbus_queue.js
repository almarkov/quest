var http = require('http')
var child_process = require('child_process')
var WebSocket = require('ws')

exports.list = []
exports.free = 1
exports.ws = undefined

// строим очередь заново из config
exports.reset = function() {
	benchmarks.add('modbusqueuejs_reset')

	exports.list = []
	exports.free = 0

	if (exports.pyshell) {
		exports.pyshell = undefined
		exports.ws = undefined
	}

	exports.ws = new WebSocket('ws://localhost:3030')

	exports.ws.on('open', function(data) {
		exports.shift()
	})

	exports.ws.on('message', function(data, flags) {
		benchmarks.add('modbusqueuejs_ws_message')
		if (data[1] == 255) { // вочдог
			helpers.process_watchdog(data)
		}
		exports.shift()
	})
}

// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.push = function(query_str) {
	benchmarks.add('modbusqueuejs_push')

	if (exports.free == 1) {
		exports.free = 0
		exports.get(query_str)
	} else {
		exports.list.push(query_str)
	}
}

// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.unshift = function(query_str) {
	benchmarks.add('modbusqueuejs_unshift')

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

	exports.ws.send(query)
}
