var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор двери шкафа
//-----------------------------------------------------------------------------
router.get('/open', function(req, res, next) {


	var result = {success: 1};
	res.json(result);
});

router.get('/close', function(req, res, next) {


	var result = {success: 1};
	res.json(result);

});

module.exports = router;