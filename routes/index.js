var express = require('express');
var router = express.Router();

// запуск GUI
router.get('/', function(req, res, next) {
	res.render('index.html', {site: siate});
});

// редирект по обработчикам событий от устройств
router.get('/:arduino_id/:device_id/:action/:parameter', function(req, res, next) {

	var query = devices.int_url_for(req.params.arduino_id, parseInt(req.params.device_id), req.params.action) + "/" + req.params.parameter;

	var url = web_server_url + query;

	simple_log('<-'
		+ ' ' + req.params.arduino_id
		+ ' ' + req.params.device_id
		+ ' ' + req.params.action
		+ ' ' + req.params.parameter 
		+ '  decoded: ' + query
	);

	http.get(query, function(res1) {
			simple_log("Got response" );
		}).on('error', function(e) {
			simple_log("Got error ");
	});
	res.send(1);
});

// редирект по эмуляторам устройств
router.get('/:device_id/:action/:parameter', function(req, res, next) {


	if (parseInt(req.params.device_id) || parseInt(req.params.device_id) == "0") {
		// эмуляция обработки запросов
		var req_ip = req.ip;
		if (req_ip == "::1") {
			req_ip = "localhost";
		} 

		var query = devices.get_redirect_url(req_ip, parseInt(req.params.device_id), req.params.action) + "/" + req.params.parameter;
		simple_log('->'
			+ ' ' + req.params.device_id
			+ ' ' + req.params.action
			+ ' ' + req.params.parameter 
			+ '  decoded: ' + query
		);
		res.redirect(301, query);

	} else {
		// обработка событий - переход к соответсвтующему .js модулю
		simple_log('->'
			+ ' ' + req.params.device_id
			+ ' ' + req.params.action
			+ ' ' + req.params.parameter 
		);
		next();
	}
});

module.exports = router;
