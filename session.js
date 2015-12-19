exports.session = 0
exports.password = 'test'

exports.is_logged = function(){
	return exports.session;
}

exports.login = function(pass){
	if (exports.password == pass) {
		exports.session = 1;

		setInterval(function(){
			exports.session = 0

		}, 1000*60*30)
		return 1;
	}
	return 0;
}
exports.logout = function() {
	exports.session = 0
}