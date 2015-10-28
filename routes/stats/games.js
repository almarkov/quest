var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	res.render('stats/games/list', {
		title:        'Управление статистикой - Игры',
	});
});

// элемент
router.get('/:id', function(req, res) {
	res.render('stats/games/form', {
		title: 'Игра',
		id:     req.params.id,
	});
});


module.exports = router;