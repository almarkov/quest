var express = require('express');
var router = express.Router();
var http   = require('http');


router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});


router.get('/ch2_playback_finished/:parameter', function(req, res, next) {

	res.json({success: 1});

	var backlight_state = devices.get('inf_mirror_backlight').state;

	var device = devices.get('audio_player_2');
	device.state = "ch1_play_ch2_stop";
	device.value = config.audio_files[19].alias;

	var player_number = gamers.quest_state % 10;

	// если идёт сканирование, игрок не предпоследний, подсветка не горит, и код введён
	// if (   ((gamers.quest_state / 10 | 0) == 12)
	// 	&& gamers.codes[player_number]
	// 	&& (player_number != gamers.count-2)
	// 	&& backlight_state == "off" )
	// {
	// 	// включаем звук на канале 2 плеера 2
	// 	var audio_file = config.color_files[gamers.quest_state % 10];
	// 	helpers.send_get('audio_player_2', 'play_channel_2', audio_file, DISABLE_TIMER, ENABLE_MUTEX,
	// 		function (params) {
	// 			var device = devices.get('audio_player_2');
	// 			device.value = audio_file;
	// 			device.state = 'ch1_play_ch2_play';
	// 		},{}
	// 	);

	// 	// зажигаем подсветку
	// 	var color = config.colors[player_number];
	// 	helpers.send_get('inf_mirror_backlight', 'on', color, DISABLE_TIMER, ENABLE_MUTEX,
	// 		function (params) {
	// 			var device = devices.get('inf_mirror_backlight');
	// 			device.value = color;
	// 			device.state = 'on';
	// 		},{}
	// 	);

	// // если идёт сканирование, игрок не предпоследний и подсветка горит
	// } else
	// если идёт сканирование, игрок не предпоследний и подсветка горит
	if (   ((gamers.quest_state / 10 | 0) == 12)
		&& gamers.codes[player_number]
		&& (player_number != gamers.count-2)
		&& backlight_state == "on" )
	{
		//  открываем дверь 4
		helpers.send_get('door_4', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	// если идёт сканирование и игрок предпоследний
	} else if (   ((gamers.quest_state / 10 | 0) == 12)
		&& gamers.codes[player_number]
		&& (player_number == gamers.count-2))
	{
		//  открываем дверь 3
		helpers.send_get('door_3', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);

	}

});


//-----------------------------------------------------------------------------
// эмулятор аудиоплеера
//-----------------------------------------------------------------------------
router.get('/play_channel_1/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/play_channel_2/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/stop_channel_1/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/stop_channel_2/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;