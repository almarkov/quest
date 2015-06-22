var express = require('express');
var router = express.Router();
var http   = require('http');

// router.get('/stopped/:parameter', function(req, res, next) {

// 	devices.get('audio_controller').state = 'stop';

// 	var result = {success: 1};
// 	res.json(result);

// 	// видео прибытия ещё не закончилось, а аудио - закончилось
// 	if (gamers.quest_state == 80) {
// 		gamers.quest_state = 85; // Стыковка(фикт)


// 	// закончилось и то и то
// 	} else if (gamers.quest_state == 85) {
// 		var query = devices.ext_url_for('audio_controller') + "/" +  devices.get_command_id('audio_controller','play') + "/0";
// 		http.get(query, function(res) {
// 				console.log("Got response: " );
// 				res.on('data', function(data){

// 					devices.get('audio_controller').state = "playing";

// 				});
// 			}).on('error', function(e) {
// 				console.log("Got error: ");
// 		});
// 		gamers.quest_state = 90; // стыковка фикт

// 	// закончилось аудио стыковки
// 	} else if (gamers.quest_state == 90) {

// 		// включаем свет
// 		var query = devices.ext_url_for('light') + "/" +  devices.get_command_id('light', 'turn_on') + "/0";
// 		http.get(query, function(res) {
// 				console.log("Got response: " );
// 				res.on('data', function(data){

// 					devices.get('light').state = "on";

// 				});
// 			}).on('error', function(e) {
// 				console.log("Got error: ");
// 		});

// 		// выключаем вибрацию
// 		var query = devices.ext_url_for('chairs') + "/" +  devices.get_command_id('chairs', 'stop_vibrate') + "/0";
// 		http.get(query, function(res) {
// 				console.log("Got response: " );
// 				res.on('data', function(data){

// 					devices.get('chairs').state = "not_fasten";

// 				});
// 			}).on('error', function(e) {
// 				console.log("Got error: ");
// 		});

// 		// включаем видео на экране 1
// 		var query = devices.ext_url_for('screen1') + "/" +  devices.get_command_id('screen1', 'play') + "/file=\/storage\/emulated\/0\/Video\/6.mp4";
// 		http.get(query, function(res) {
// 				console.log("Got response: " );
// 				res.on('data', function(data){

// 					devices.get('screen1').state = "playing";

// 				});
// 			}).on('error', function(e) {
// 				console.log("Got error: ");
// 		});



// 		gamers.quest_state = 100; // Приглашение на сканирование
// 	}
// });


router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});


router.get('/ch2_playback_finished/:parameter', function(req, res, next) {

	devices.get('audio_player_1').state = "ch1_play_ch2_stop";
	devices.get('audio_player_1').value = config.files[0];

	var result = {success: 1};
	res.json(result);

	// подготовка к перелёту
	if (gamers.quest_state == 60) {
		// включаем видео на экране 2
		var query = devices.build_query('video_player_2', 'play', config.files[5]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_2').state = "playing";
					devices.get('video_player_2').value = config.files[5];
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем вибрацию
		var query = devices.build_query('vibration', 'on', '0');
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('vibration').state = "on";
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		gamers.quest_state = 70; //'Перелёт';

	// видео ещё не закончилось
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
					devices.get('audio_player_1').value = config.files[8];

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		gamers.quest_state = 90; // стыковка
	// закончилось аудио стыковки
	} else if (gamers.quest_state == 90) {

		// включаем свет
		var query = devices.build_query('light', 'on', "0");
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('light').state = "on";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// выключаем вибрацию
		var query = devices.build_query('vibration', 'off', '0');
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('vibration').state = "off";
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// включаем видео на экране 1
		var query = devices.build_query('video_player_1', 'play', config.files[9]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('video_player_1').state = "playing";
					devices.get('video_player_1').value = config.files[9];
					
				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
		
	}


});

//-----------------------------------------------------------------------------
// эмулятор аудиоплеера
//-----------------------------------------------------------------------------
router.get('/play_channel_1/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

router.get('/play_channel_2/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});

module.exports = router;