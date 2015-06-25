var express = require('express');
var router = express.Router();

// запуск GUI
router.get('/', function(req, res, next) {
	res.render('index.html', {site: siate});
});

// редирект по обработчикам событий от устройств
router.get('/:arduino_id/:device_id/:action/:parameter', function(req, res, next) {
	console.log(req.params.arduino_id);
	console.log(req.params.device_id);
	console.log(req.params.action);
	console.log(req.params.parameter);
	var url = "http://localhost:3000" + devices.int_url_for(req.params.arduino_id, parseInt(req.params.device_id), req.params.action);
	url += "/" + req.params.parameter;
	var query = url;
	http.get(query, function(res1) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
	});
	res.send(1);
});

// редирект по эмуляторам устройств
router.get('/:device_id/:action/:parameter', function(req, res, next) {
	console.log(req.params.device_id);
	console.log(req.params.action);
	console.log(req.params.parameter);
	if (parseInt(req.params.device_id) || parseInt(req.params.device_id) == "0") {
		// эмуляция обработки запросов
		var req_ip = req.ip;
		if (req_ip == "::1") {
			req_ip = "localhost";
		} 
		if (req.params.device_id == 255) {
			res.redirect(301, "/wd/0/0");
		} else {
			var url = devices.get_redirect_url(req_ip, parseInt(req.params.device_id), req.params.action);
			url += "/" + req.params.parameter;
			console.log(url);
			res.redirect(301, url);
		}
	} else {
		// обработка событий - переход к соответсвтующему .js модулю
		next();
	}
});

module.exports = router;
