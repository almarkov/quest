var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('device_commands/list', { title: 'Список команд' });
});

router.get('/list', function(req, res) {
	var db = req.db;
    var collection = db.get('device_commands');
    collection.find({},{},function(e,device_commands){
        res.json(device_commands);
    });
});

router.post('/add', function(req, res) {
    var db = req.db;
    var collection = db.get('device_commands');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

module.exports = router;