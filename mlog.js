var fs           = require('fs')
var util         = require('util')

exports.log_file     = null
exports.dev_log_file = null
exports.log_stdout   = null

exports.reset = function(){
	var dir = 'log/'
	if (exports.log_file) {
		exports.log_file.end()
		exports.dev_log_file.end()
	}
	exports.log_file = fs.createWriteStream(dir + routines.ymd_date() + 'debug.log', {flags : 'a'})
	exports.dev_log_file =  fs.createWriteStream(__dirname + '/log/' + routines.ymd_date() + 'dev.log', {flags : 'a'})
	exports.log_stdout = process.stdout

	var retain_files_cnt = 5
	var log_files = fs.readdirSync(dir).map(function(v) { return v.toString(); }).sort()
	if (log_files.length > retain_files_cnt) {
		for (var i = 0; i < log_files.length - retain_files_cnt; i++) {
			fs.unlinkSync(dir + log_files[i])
		}
	}
}

exports.simple = function(d) {
	exports.log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n')
	exports.log_stdout.write(util.format(d) + '\n')
}

exports.dev = function(d) {
	exports.dev_log_file.write(routines.ymdhms_date() + "       " + util.format(d) + '\r\n')
}
