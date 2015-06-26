var express = require('express');
var router = express.Router();
var http   = require('http');

router.get('/ch1_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});
});


router.get('/ch2_playback_finished/:parameter', function(req, res, next) {
	res.json({success: 1});

	var device = devices.get('audio_player_4');
	device.state = "ch1_play_ch2_stop";
	device.value = config.files[0];

	// Все игроки снова собрались вместе и приглашаются во дворец благоденствия»
	if (gamers.quest_state == 145) {
		// открываем дверь 5
		helpers.send_get('door_5', 'open', '0', ENABLE_TIMER, ENABLE_MUTEX);
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

module.exports = router;