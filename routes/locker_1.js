var express = require('express');
var router = express.Router();

//-----------------------------------------------------------------------------
// эмулятор двери шкафа
//-----------------------------------------------------------------------------
router.get('/open', function(req, res, next) {
	res.json({success: 1});
});

router.get('/close', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;