var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('device_types/list', { title: 'Express' });
});

module.exports = router;