var express = require('express');
var router = express.Router();

// запуск GUI
router.get('/', function(req, res, next) {
	res.render('index.html', {site: siate});
});

// редирект по обработчикам событий от устройств
router.get('/:arduino_id/:device_id/:action/:parameter', function(req, res, next) {
	var url = devices.int_url_for(parseInt(req.params.arduino_id), parseInt(req.params.device_id));
	url += "/" + config.actions_list[req.params.action] + "/" + req.params.parameter;
	res.redirect(url);
});

router.get('/:device_id/:action/:parameter', function(req, res, next) {
	if (parseInt(req.params.device_id)) {
		// эмуляция обработки запросов
		var req_ip = req.ip;
		if (req_ip == "::1") {
			req_ip = "localhost";
		} 
		var url = devices.get_redirect_url(req_ip, parseInt(req.params.device_id));
		url += "/" + config.actions_list[req.params.action] + "/" + req.params.parameter;
		console.log(url);
		res.redirect(301, url);
	} else {
		// обработка событий - переход к соответсвтующему .js модулю
		next();
	}
});

module.exports = router;
