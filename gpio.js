var PythonShell  = require('python-shell')

exports.init = function () {
	var pyshell      = new PythonShell('init_gpio.py', {mode: 'binary', pythonOptions: ['-u']})

	pyshell.end(function (err) {
		if (err) {
			mlog.dev('init gpio error')
			console.log('init gpio error')
			return;
		}
		mlog.dev('init gpio ok')
		console.log('init gpio ok')
	})
}
