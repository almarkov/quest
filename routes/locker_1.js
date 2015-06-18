var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор двери шкафа
//-----------------------------------------------------------------------------
router.get('/open', function(req, res, next) {

	devices._locker_door.state = 'opened';

	var result = {success: 1, state: devices._locker_door};
	res.json(result);
});

router.get('/close', function(req, res, next) {

	devices._locker_door.state = 'closed';

	var result = {success: 1, state: devices._locker_door};
	res.json(result);

});

module.exports = router;