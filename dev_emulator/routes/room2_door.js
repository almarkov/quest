var express = require('express');
var router = express.Router();

router.get('/open', function(req, res, next) {
	devices._room2_door.state = 'opened';

	var result = {success: 1, state: devices._room2_door};
	res.json(result);
});

router.get('/close', function(req, res, next) {
	devices._room2_door.state = 'closed';

	var result = {success: 1, state: devices._room2_door};
	res.json(result);

});

module.exports = router;