var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор двери
//-----------------------------------------------------------------------------
router.get('/open/:parameter', function(req, res, next) {
	//devices._entrance_door.state = 'opened';

	var result = {success: 1, state: devices._entrance_door};
	res.json(result);

});

router.get('/close/:parameter', function(req, res, next) {
	//devices._entrance_door.state = 'closed';

	var result = {success: 1, state: devices._entrance_door};
	res.json(result);

});


module.exports = router;