var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор двери
//-----------------------------------------------------------------------------
router.get('/open/0', function(req, res, next) {
	devices._room3_door.state = 'opened';

	var result = {success: 1, state: devices._room3_door};
	res.json(result);
});

router.get('/close/0', function(req, res, next) {
	devices._room3_door.state = 'closed';

	var result = {success: 1, state: devices._room3_door};
	res.json(result);

});

module.exports = router;