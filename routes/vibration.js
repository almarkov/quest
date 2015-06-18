var express = require('express');
var router = express.Router();
var http   = require('http');

// эмуляция ыибрации 
router.get('/on/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);

});
router.get('/off/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;