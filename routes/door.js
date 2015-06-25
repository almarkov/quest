var express = require('express');
var router = express.Router();

//-----------------------------------------------------------------------------
// эмулятор двери
//-----------------------------------------------------------------------------
router.get('/open/:parameter', function(req, res, next) {

	res.json({success: 1});

});

router.get('/close/:parameter', function(req, res, next) {

	res.json({success: 1});

});


module.exports = router;