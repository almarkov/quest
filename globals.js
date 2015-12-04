var jsonfile     = require('jsonfile')

exports.globals_hash  = {}

exports.load = function() {
	benchmarks.add('globalsjs_load')
	var config_file = 'config.json'
	exports.globals_hash = jsonfile.readFileSync(config_file, {throws: false})

}

exports.get = function(name) {
	benchmarks.add('globalsjs_get')
	var global = exports.globals_hash[name]
	if (global) {
		return global
	}
	return null
}