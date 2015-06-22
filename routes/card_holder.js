var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/given/:parameter', function(req, res, next) {

	devices.get('card_holder').state = "given";

	// включаем видео на экране 4
	var query = devices.build_query('video_player_4', 'play', config.files[18]);
	http.get(query, function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				devices.get('video_player_4').state = "playing";
				devices.get('video_player_4').value = config.files[18];
				
			});
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
	
});

module.exports = router;