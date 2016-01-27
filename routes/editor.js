var express = require('express')
var router  = express.Router()


// список
router.get('/', function(req, res) {
	res.render('editor', {
		title:        'Редактор сценариев',
	})
})

module.exports = router
