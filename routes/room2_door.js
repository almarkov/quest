var express = require('express');
var router = express.Router();
//-----------------------------------------------------------------------------
// эмулятор двери
//-----------------------------------------------------------------------------
router.get('/open/:parameter', function(req, res, next) {
	//devices._room2_door.state = 'opened';

	var result = {success: 1};
	res.json(result);
});

router.get('/close/:parameter', function(req, res, next) {
	//devices._room2_door.state = 'closed';

	var result = {success: 1};
	res.json(result);

});

module.exports = router;