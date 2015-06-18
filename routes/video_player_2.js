var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_2').state = 'stopped';

	var result = {success: 1};
	res.json(result);

	// видео перелёта закончилось
	if (gamers.quest_state == 70) {
		gamers.quest_state = 80; // Стыковка

		// включаем звук прибытия на станцию
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[6]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем видео на экране 2
		var query = devices.build_query('video_player_2', 'play', config.files[7]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_2').state = "playing";
					devices.get('video_player_2').value = config.files[7];
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
	// видео прибытия ещё не закончилось, а аудио - закончилось
	} else if (gamers.quest_state == 80) {
		gamers.quest_state = 85; // Стыковка(фикт)

	// закончилось и то и то
	} else if (gamers.quest_state == 85) {
		// включаем звук  стыковки
		var query = devices.build_query('audio_player_1', 'play_channel_2', config.files[8]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_1').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		gamers.quest_state = 90; // стыковка фикт
	}
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;