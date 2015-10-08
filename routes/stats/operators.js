var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	console.log('routes-stats-operators');
	res.render('stats/operators/list', {
		title:        'Управление статистикой - Операторы',
	});
});

module.exports = router;