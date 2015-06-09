var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор света
//-----------------------------------------------------------------------------
router.get('/on', function(req, res, next) {

	devices._light.state = 'on';

	var result = {success: 1, state: devices._light};
	res.json(result);
});

router.get('/off', function(req, res, next) {

	devices._light.state = 'off';

	var result = {success: 1, state: devices._light};
	res.json(result);

});

module.exports = router;