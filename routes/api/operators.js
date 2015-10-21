var express = require('express');
var router = express.Router();

// АПИ

// список
router.get('/list', function(req, res) {
	mbd.select('operators', {}, function(err, result){
		res.json(
			(err === null) ? result : { msg: err }
		);
	});
});
// элемент
router.get('/:id', function(req, res) {

	mbd.findById('operators', req.params.id, function(err, operator){
		res.json(
			(err === null) ? operator : { msg: err }
		);
	});

});

// создание
router.post('/create', function(req, res) {
	mbd.insert('operators', req.body, {}, function(err, result){
		res.send(
			(err === null) ? { msg: '', new_id: result._id } : { msg: err }
		);
	});
});

// обновление
router.post('/:id', function(req, res) {
	mbd.findAndUpdate('operators', {'_id': req.params.id }, req.body, function(err, result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});
// удаление
router.get('/:id/delete', function(req, res) {

	mbd.remove('operators', {_id: req.params.id}, function(err, result){
		res.json({
			msg: ((err === null) ? '' : err ),
		});
	})
});

module.exports = router;