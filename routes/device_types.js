var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
	collection.find({},{},function(e, device_types){
		res.render('device_types/list', {
			title:       'Список устройств',
			device_types: device_types,
		});
	});
});

router.get('/add', function(req, res) {
	var db = req.db;
	var collection = db.get('device_types');
    res.render('device_types/add', {
    	title:       'Добавить устройство',
    	device_type: device_type,
    });
});

router.get('/:device_type_name', function(req, res) {
	var device_type_name = req.params.device_type_name;
	var db = req.db;
	var collection = db.get('device_types');
	var device_commands_collection = db.get('device_commands');

	collection.findOne({'name': device_type_name},{},function(e, device_type){
		console.log(device_type);
		device_commands_collection.find( {"device_type_id" : device_type._id}, {}, function(e, device_commands) {
			device_type.device_commands = device_commands;
			console.log(device_type);
			res.render('device_types/add', {
		    	title:       'Добавить устройство',
		    	device_type: device_type,
		    });
		});
	});
});


router.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('device_types');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;