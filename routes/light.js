var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор света
//-----------------------------------------------------------------------------
router.get('/turn_on/0', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
});

router.get('/turn_off/0', function(req, res, next) {


	var result = {success: 1};
	res.json(result);

});

module.exports = router;