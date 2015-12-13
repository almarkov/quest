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

	// exports.pyshell.stdout.on('data', function(data){
	// 	mlog.dev('modbus response get')
	// 	mlog.dev(data)
	// 	console.log('modbus response get')
	// 	console.log(data)
	// 	if (data[1] == 255) { // вочдог
	// 		helpers.process_watchdog(data)	
	// 	}
	// })
}

// если очередь пуста, сразу выполняем
// иначе помещаем в соотв. очередь
exports.push = function(query_str) {
	benchmarks.add('modbusqueuejs_push')
	// mlog.dev('modbus queue push')
	// mlog.dev(query_str)
	// mlog.dev(exports.free)

	console.log('modbus queue push')
	// console.log(query_str)
	// console.log(exports.free)
	console.log(exports.list.length)

	if (exports.free == 1) {
		exports.free = 0
		exports.get(query_str)
	} else {
		exports.list.push(query_str)
	}
}

exports.unshift = function(query_str) {
	console.log('modbus_queue_unshift')
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

	// http.get('http://127.0.0.1:8000/' + query.toString('ascii') , function(res) {
	// 		res.on('data', function(data){
	// 			console.log('modbus get data succ')
	// 		})
	// 		res.on('error', function(data){
	// 			console.log('modbus get data err')
	// 		})
	// 	}).on('error', function(e) {
	// 		console.log('modbus get err(maybeok)')
	// })

	// exports.pyshell = new PythonShell('request.py', {mode: 'binary', pythonOptions: ['-u']})

	// exports.pyshell.send(query);

	// exports.pyshell.stdout.on('data', function (data) {

	// 	mlog.dev('modbus response get')
	// 	mlog.dev(data)
	// 	console.log('modbus response get')
	// 	console.log(data)
	// 	if (data[1] == 255) { // вочдог
	// 		helpers.process_watchdog(data)	
	// 	}
		
	// })

	// exports.pyshell.end(function (err) {
	// 	if (err) throw err;
	// 	mlog.dev('request.py ended')
	// 	console.log('request.py ended')
	// 	exports.shift()
	// })
}
