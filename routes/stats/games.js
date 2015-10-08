var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	console.log('routes-stats-games');
	res.render('stats/games/list', {
		title:        'Управление статистикой - Игры',
	});
});

module.exports = router;