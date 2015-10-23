var jsonfile     = require('jsonfile')

exports.globals_hash  = {}

exports.load = function() {
	var config_file = 'config.json'
	exports.globals_hash = jsonfile.readFileSync(config_file, {throws: false})
}

exports.get = function(name) {
	var global = exports.globals_hash[name]
	if (global) {
		return global.value
	}
	return null
}