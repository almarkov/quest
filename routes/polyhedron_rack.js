var express = require('express');
var router = express.Router();
var http   = require('http');

// активирована подставка
router.get('/activated', function(req, res, next) {
console.log('activate');
	devices._polyhedron_rack.state = 'active';
	//

	var result = {success: 1};
	res.json(result);
});

// активирована подставка
router.get('/deactivated', function(req, res, next) {

	devices._polyhedron_rack.state = 'idle';
	//

	var result = {success: 1};
	res.json(result);
});

module.exports = router;