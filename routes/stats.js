var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	res.render('stats/list', {
		title:        'Управление статистикой',
	});
});

module.exports = router;