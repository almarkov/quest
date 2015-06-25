var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/playback_finished/:parameter', function(req, res, next) {

	devices.get('video_player_2').state = 'stopped';

	res.json({success: 1});

	// видео перелёта закончилось
	if (gamers.quest_state == 70) {
		gamers.quest_state = 80; // Стыковка

		// включаем звук прибытия на станцию
		// включаем звук на канале 2 плеера 3
		helpers.send_get('audio_player_1', 'play_channel_2', config.files[6], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_1');
				device.value = config.files[6];
				device.state = 'ch1_play_ch2_play';
			},{}
		);

		// включаем видео на экране 2
		helpers.send_get('video_player_2', 'play', config.files[7], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('video_player_2');
				device.value = config.files[7];
				device.state = 'playing';
			},{}
		);

	// видео прибытия ещё не закончилось, а аудио - закончилось
	} else if (gamers.quest_state == 80) {
		gamers.quest_state = 85; // Стыковка(фикт)

	// закончилось и то и то
	} else if (gamers.quest_state == 85) {
		// включаем звук  стыковки
		helpers.send_get('audio_player_1', 'play_channel_2', config.files[8], DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				var device = devices.get('audio_player_1');
				device.value = config.files[8];
				device.state = 'ch1_play_ch2_play';
			},{}
		);
		gamers.quest_state = 90; // стыковка

	// закончился обратный перелёт
	} else if (gamers.quest_state == 230) {
		//выключаем вибрацию
		helpers.send_get('vibration', 'off', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('vibration').state = "off";
			},{}
		);

		// открываем дверь 1
		helpers.send_get('door_1', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX,
			function (params) {
				devices.get('door_1').state = "opened";
			},{}
		);

		gamers.quest_state = 240; // квест пройден

	}
});

//-----------------------------------------------------------------------------
// эмулятор видеоплеера
//-----------------------------------------------------------------------------
router.get('/play/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;