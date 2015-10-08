var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	console.log('routes-stats');
	res.render('stats/list', {
		title:        'Управление статистикой',
	});
});

module.exports = router;