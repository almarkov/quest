exports.timers_hash = {};

exports.start = function(name, timeout, callback) {
	benchmarks.add('mtimersjs_start')
	var timer = {
		timeout: timeout,
		name:    name,
		value:   0,
		active:  1,
		ready:   0,
	};
	exports.timers_hash[name] = timer;
	timer._intervalObject = setInterval(function() {
		benchmarks.add('mtimersjs_start_setinterval')
		timer.value += 1;

		face.field_set_value(name, timer.value + '/' + timer.timeout);
		if (timer.value == timeout) {
			clearInterval(timer._intervalObject);
			timer.ready = 1;
			face.field_set_value('timer_state', 'Готов');
			logic.submit_event('Таймер готов', timer.name, timer.value);
		}
	}, 1000);
}

exports.stop = function(name, variable) {
	benchmarks.add('mtimersjs_stop')
	var timer = exports.timers_hash[name];
	clearInterval(timer._intervalObject);
	logic.set_variable(variable, timer.value);

}

exports.reset = function() {
	benchmarks.add('mtimersjs_reset')
	for (var timer in exports.timers_hash) {
		clearInterval(exports.timers_hash[timer]._intervalObject);
	}
	exports.timers_hash = {};
}