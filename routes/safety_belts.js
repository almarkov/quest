var express = require('express');
var router = express.Router();
var http   = require('http');

// ремни пристёгнуты
router.get('/number_of_fastened/:parameter', function(req, res, next) {

	devices.get('safety_belts').value = req.params.parameter;

	// все пристёгнуты?
	if (parseInt(gamers.count) <= parseInt(req.params.parameter)) {
		// если подготовка к обратному перелёту
		if (gamers.quest_state == 220) {

			// включаем звук на канале 2 плеера 1
			helpers.send_get('audio_player_1', 'play_channel_2', config.files[20], DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_1');
					device.value = config.files[20];
					device.state = 'ch1_play_ch2_play';
				},{}
			);

			// включаем видео на экране 2
			helpers.send_get('video_player_2', 'play', config.files[21], DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('video_player_2');
					device.value = config.files[21];
					device.state = 'playing';
				},{}
			);

			// включаем вибрацию
			helpers.send_get('vibration', 'on', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					devices.get('vibration').state = "on";
				},{}
			);

			// усыпляем планшет-координат
			helpers.send_get('terminal_4', 'deactivate', '0', DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					devices.get('terminal_4').state = "sleep";
				},{}
			);

			gamers.quest_state = 230; //'Перелёт';

		// если подготовка к перелёту(1)
		} else if (gamers.quest_state == 60) {

			// включаем звук на канале 2 плеера 1
			helpers.send_get('audio_player_1', 'play_channel_2', config.files[4], DISABLE_TIMER, ENABLE_MUTEX,
				function (params) {
					var device = devices.get('audio_player_1');
					device.value = config.files[4];
					device.state = 'ch1_play_ch2_play';
				},{}
			);
		}
	}

	res.json({success: 1});

});

module.exports = router;