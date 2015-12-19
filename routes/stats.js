var express = require('express')
var router  = express.Router()

// список
router.get('/', function(req, res) {
	if (session.is_logged()) {
		res.render('stats/list', {
			title:        'Управление статистикой',
		})
	} else {
		res.render('login', {
			title:        'Вход в управление статистикой',
		})
	}
})

module.exports = router
