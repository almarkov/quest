var express = require('express');
var router = express.Router();

// АПИ

// создание
router.post('/login', function(req, res) {
	if (session.login(req.body.password)) {
		res.json({ msg: '' })
	} else {
		res.json({ msg: 'Неверный пароль' })
	}
});

// создание
router.get('/logout', function(req, res) {
	session.logout()
	res.json({ msg: '' })
});



module.exports = router;