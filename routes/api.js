var express = require('express');
var router = express.Router();

// список
router.get('/', function(req, res) {
	console.log('routes-api');
	res.render('stats/list', {
		title:        'Управление статистикой(api)',
	});
});

module.exports = router;