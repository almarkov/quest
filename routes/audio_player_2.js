var express = require('express');
var router = express.Router();
var http   = require('http');


router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	var result = {success: 1};
	res.json(result);
});


router.get('/ch2_playback_finished/:parameter', function(req, res, next) {

	var result = {success: 1};
	res.json(result);
	var backlight_state = devices.get('inf_mirror_backlight').state;

	// если не предпоследний игрок 
	if (   ((gamers.quest_state / 10 | 0) == 12)
		&& (gamers.quest_state % 10 != gamers.count-2)
		&& backlight_state == "off" )
	{
		// включаем звук на канале 2 плеера 2
		var query = devices.build_query('audio_player_2', 'play_channel_2', config.color_files[gamers.quest_state % 10]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('audio_player_2').value = config.color_files[gamers.quest_state % 10];
					devices.get('audio_player_2').state = "ch1_play_ch2_play";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});

		// зажигаем подсветку
		var query = devices.build_query('inf_mirror_backlight', 'on', config.colors[gamers.quest_state % 10]);
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('inf_mirror_backlight').value = config.colors[gamers.quest_state % 10];
					devices.get('inf_mirror_backlight').state = "on";

				});
			}).on('error', function(e) {
				console.log("Got error: ");
		});
	// если не предпоследний игрок и cвет включён
	} else if (   ((gamers.quest_state / 10 | 0) == 12)
		&& (gamers.quest_state % 10 != gamers.count-2)
		&& backlight_state == "on" )
	{
		//  открываем дверь 4
		var query = devices.build_query('door_4', 'open', '0');
		devices.get('door_4').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_4').mutex = 0;
				res.on('data', function(data){

					// запускаем таймер
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});

				});
			}).on('error', function(e) {
				devices.get('door_4').mutex = 0;
				console.log("door_4 close error: ");
		});

	}

	// если ждали окончания сканирования предпоследнего игрока
	else if (   ((gamers.quest_state / 10 | 0) == 12)
		&& (gamers.quest_state % 10 == gamers.count-2))
	{
		//  открываем дверь 3
		var query = devices.build_query('door_3', 'open', '0');
		devices.get('door_3').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_3').mutex = 0;
				res.on('data', function(data){

					// запускаем таймер
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});

				});
			}).on('error', function(e) {
				devices.get('door_3').mutex = 0;
				console.log("door_3 close error: ");
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