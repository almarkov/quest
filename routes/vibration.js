var express = require('express');
var router = express.Router();

//-----------------------------------------------------------------------------
// эмулятор вибрации
//-----------------------------------------------------------------------------
router.get('/on/:parameter', function(req, res, next) {
	res.json({success: 1});

});
router.get('/off/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;