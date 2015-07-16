var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('device_commands/list', { title: 'Список устройств' });
});

module.exports = router;