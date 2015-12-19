var express = require('express')
var router  = express.Router()

router.use(function(req, res, next) {
	if (session.is_logged()) {
		next()
	} else {
		res.render('login', {
			title:        'Вход в управление статистикой',
		})
	}
});

// список
router.get('/', function(req, res) {
	res.render('stats/list', {
		title:        'Управление статистикой',
	})
})

module.exports = router
