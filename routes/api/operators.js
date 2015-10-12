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
// // удаление
// router.delete('/:id', function(req, res) {
// 	var db = req.db;
// 	var device_types = db.get('device_types');
// 	var id = req.params.id;

// 	device_types.remove({_id: id}, function(err, result){
// 		res.json({
// 			msg: ((err === null) ? '' : err ),
// 			data: result,
// 		});
// 	})
// });

// // удаление команды из типа устройства
// router.delete('/:id/:table/:item_id', function(req, res) {
// 	var table = req.params.table;

// 	var db = req.db;
// 	var device_types = db.get('device_types');
// 	var id = req.params.id;
// 	var items = db.get(table);
// 	var item_id = req.params.item_id;

// 	items.findById(item_id, function(err, item) {
// 		var pull_item = {};
// 		pull_item[table] = item;
// 		device_types.findAndModify(
// 			{
// 				query: {
// 					'_id': id
// 				},
// 				update: {
// 					$pull: pull_item
// 				},
// 			},
// 			{
// 				new: true,
// 			},
// 			function(err, result){
// 				res.json({
// 					msg: ((err === null) ? '' : err ),
// 					data: result,
// 				});
// 			}
// 		);
// 	})
// });

// // добавляем команду
// router.put('/:id/:table/:item_id', function(req, res) {

// 	var table = req.params.table;

// 	var db = req.db;
// 	var device_types = db.get('device_types');
// 	var items = db.get(table);
// 	var id = req.params.id;
// 	var item_id = req.params.item_id;

// 	items.findById(item_id, function(err, item) {
// 		var push_item = {};
// 		push_item[table] = item;
// 		device_types.findAndModify(
// 			{
// 				query: {
// 					'_id': id
// 				},
// 				update: {
// 					$push: push_item
// 				},
				
// 			},
// 			{
// 				new: true,
// 			},
// 			function(err, result){
// 				console.log(result);
// 				res.json({
// 					msg: ((err === null) ? '' : err ),
// 					data: result,
// 				});
// 			}
// 		);
// 	})
// });


module.exports = router;