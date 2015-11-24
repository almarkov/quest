var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	res.render('stats/operators/list', {
		title:        'Управление статистикой - Операторы',
	});
});

// создание
router.get('/create', function(req, res) {
	res.render('stats/operators/form', {
		title: 'Создание ',
	});
});

// элемент
router.get('/:id', function(req, res) {
	res.render('stats/operators/form', {
		title: 'Оператор',
		id:     req.params.id,
	});
});


module.exports = router;