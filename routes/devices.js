var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('devices/list', { title: 'Express' });
});


module.exports = router;