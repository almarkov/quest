var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
	collection.find({},{},function(e, device_types){
		res.render('device_types/list', {
			title:        'Список устройств',
			device_types: device_types,
		});
	});
});

router.get('/list', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
	collection.find({},{},function(e, device_types){
		res.json('device_types/list', device_types);
	});
});


router.get('/add', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');

	res.render('device_types/add', {
		title:       'Добавить устройство',
		device_type: {
			device_commands: []
		},

	});
});

// router.get('/:id', function(req, res) {
// 	var id = req.params.id;
// 	var db = req.db;
// 	var collection = db.get('device_types');

// 	collection.findOne({'_id': id},{},function(e, device_type){
// 		console.log(device_type);

// 		res.render('device_types/add', {
// 			title:      'Добавить устройство',
// 			device_type: device_type,
// 		});
// 	});
// });

router.get('/:id', function(req, res) {
	var id = req.params.id;
	var db = req.db;
	var collection = db.get('device_types');

	collection.findOne({'_id': id},{},function(err, device_type){
		console.log(device_type);
		res.json(
			(err === null) ? device_type : { msg: err }
		);
	});
});

router.get('/:id/device_commands/list', function(req, res) {

	var db = req.db;
	var collection = db.get('device_types');
	var id = req.params.id;

	collection.findById(id, function(err, device_type){
		console.log(device_type);
		res.json(
			(err === null) ? device_type.device_commands : { msg: err }
		);
	});

});


router.post('/:id/device_commands/add', function(req, res) {

	var db = req.db;
	var collection = db.get('device_types');
	var device_commands = db.get('device_commands');
	var id = req.params.id;
	var command_id = req.body.command_id;

	device_commands.findById(command_id, function(err, device_command) {
		collection.findAndModify(
			{
				query: {
					'_id': id
				},
				update: {
					$push: {
						'device_commands': device_command
					}
				},
			},
			
			function(err, result){
				res.send(
					(err === null) ? { msg: '' } : { msg: err }
				);
			}
		);
	})
});

router.get('/:id/device_commands/:device_command_id/delete', function(req, res) {

	var db = req.db;
	var collection = db.get('device_types');
	var device_commands = db.get('device_commands');
	var id = req.params.id;
	var device_command_id = req.params.device_command_id;

	device_commands.findById(device_command_id, function(err, device_command) {
		collection.findAndModify(
			{
				query: {
					'_id': id
				},
				update: {
					$pull: {
						'device_commands': device_command
					}
				},
			},
			
			function(err, result){
				res.send(
					(err === null) ? { msg: '' } : { msg: err }
				);
			}
		);
	})
});

// создание
router.post('/create', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
	collection.insert(req.body, function(err, result){
		console.log(result);
		res.send(
			(err === null) ? { msg: '', new_id: result._id } : { msg: err }
		);
	});
});

// обновление
router.post('/:id', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
	var id = req.params.id;

	collection.findAndModify({'_id': id }, {$set: req.body}, function(err, result){
		res.send(
			(err === null) ? { msg: '' } : { msg: err }
		);
	});
});


module.exports = router;