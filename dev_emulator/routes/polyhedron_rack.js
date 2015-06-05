var express = require('express');
var router = express.Router();
var http   = require('http');

// активирована подставка
router.get('/activated', function(req, res, next) {

	devices._polyhedron_rack.state = 'active';

	http.get(web_server_url + "/polyhedron_rack/activated/",
		function(res) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
		});
	var result = {success: 1};
	res.json(result);
});

// активирована подставка
router.get('/deactivated', function(req, res, next) {

	devices._polyhedron_rack.state = 'idle';

	http.get(web_server_url + "/polyhedron_rack/deactivated/",
		function(res) {
			console.log("Got response: " );
		}).on('error', function(e) {
			console.log("Got error: ");
		});
	var result = {success: 1};
	res.json(result);
});

module.exports = router;