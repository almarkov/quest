var http = require('http');

exports._entity = {
	timeout: 0,
	value:   0,
	active:  0,
	_intervalObject: null,
};

// инициализировать таймер
exports.start = function (timeout){
	exports._entity.timeout = timeout;
	exports._entity.value   = 0;
	exports._entity.active  = 1;
	exports._entity._intervalObject = setInterval(function() {
		exports._entity.value += 1;
		if (exports._entity.value == timeout) {
			clearInterval(exports._entity._intervalObject);
			queue.get({
				url: devices.build_query('timer', 'ready', '') 
			}, null)
		}
	}, 1000);
}

exports.stop = function (timeout){
	exports._entity.active  = 0;
}

exports.get = function () {
	return {
		timeout: exports._entity.timeout,
		value:   exports._entity.value,
		active:  exports._entity.active
	};
}