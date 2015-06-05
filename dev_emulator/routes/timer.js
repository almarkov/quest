var express = require('express');
var router = express.Router();

router.get('/activate/:value', function(req, res, next) {
console.log(devices._timer);
console.log(req.params);
	devices._timer.state = 'active';
	devices._timer.value = req.params.value;
	devices._timer.current_value = req.params.value;

	var result = {success: 1, state: devices._timer};
	res.json(result);
	
});

module.exports = router;