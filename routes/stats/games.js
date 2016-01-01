var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {

	res.render('stats/games/list', {
		title: 'Управление статистикой - Игры',
		page:  req.query.page  || 1,
		count: req.query.count || 30,
		operator_id: req.query.operator_id || 0,
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