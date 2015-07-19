var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});

router.get('/ch2_playback_finished/:parameter', function(req, res, next) {

	res.json({success: 1});

	var backlight_state = devices.get('inf_mirror_backlight').state;

	var device = devices.get('audio_player_2');
	device.state = "ch1_play_ch2_stop";
	device.value = config.audio_files[19].alias;

	var player_number = gamers.quest_state % 10 + 1;

	// если идёт сканирование, игрок не предпоследний и подсветка горит
	if (   ((gamers.quest_state / 10 | 0) == 12)
		&& gamers.codes[player_number-1]
		&& (player_number != gamers.count-1)
		&& backlight_state == "on" )
	{
		//  открываем дверь 4
		helpers.send_get('door_4', 'open', '0', helpers.get_timeout('T1'), ENABLE_MUTEX);

	// если идёт сканирование и игрок предпоследний
	} else if (   ((gamers.quest_state / 10 | 0) == 12)
		&& gamers.codes[player_number-1]
		&& (player_number == gamers.count-1))
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