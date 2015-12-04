var getmac = require('getmac')
var fs     = require('fs')
var crypto = require('crypto');

exports.check = function(){
	benchmarks.add('licensejs_check')
	var key;
	try {
		key = fs.readFileSync('license', 'utf8')
	} catch (e) {
		get_license();
	}
	getmac.getMac(function(err,macAddress){
		if (err)  throw err
		var hash  = crypto.createHash('md5').update(macAddress).digest('hex')
		var hash2 = crypto.createHash('md5').update(hash).digest('hex')
		if (key == hash2) {
			logic.init();
		} else {
			get_license();
		}
	})
	return 0;
}

function get_license() {
	benchmarks.add('licensejs_get_license')
	getmac.getMac(function(err,macAddress){
		if (err)  throw err
		var hash = crypto.createHash('md5').update(macAddress).digest('hex')
		try {
			fs.writeFileSync('getlicense', hash)
		} catch (e) {
		}
	})
}