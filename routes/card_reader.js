var express = require('express');
var router = express.Router();
var http   = require('http');

//-----------------------------------------------------------------------------
// события
//-----------------------------------------------------------------------------
router.get('/card_ok/:parameter', function(req, res, next) {

	if (gamers.game_state == 'gamers_opened_cube_with_RFID') {

		gamers.game_state = 'gamers_in_hallway';

		if (devices.get('card_reader').state != "passed") {
			devices.get('card_reader').state = "passed";

			//  открываем дверь 6
			helpers.send_get('door_6', 'open', '0', DISABLE_TIMER, ENABLE_MUTEX, 
				function(params){
					devices.get('door_6').state = 'opened';
				}, {}
			);

			// пробуждаем планшет-светялчок
			helpers.send_get('terminal_3', 'go', "0\/field=2,540,180;3,240,60;3,120,360;6,660,0;3,660,300;9,720,360;\@2,70,0,140;1,70,140,140;1,215,140,430;2,430,140,200;1,430,70,585;2,585,70,140;1,585,140,730;2,730,0,70;2,215,200,345;1,290,270,800;2,800,470,480", DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					devices.get('terminal_3').state = 'active';
				}, {}
			);

			// включаем звук 'треск и искры'
			helpers.send_get('audio_player_4', 'play_channel_2', config.audio_files[23].value, DISABLE_TIMER, ENABLE_MUTEX,
				function(params){
					var device   = devices.get('audio_player_4');
					device.value = config.audio_files[23].alias;
					device.state = "ch1_play_ch2_stop";
				}, {}
			);

		}
	}

	res.json({success: 1});
});

//-----------------------------------------------------------------------------
// эмулятор
//-----------------------------------------------------------------------------
router.get('/reset/:parameter', function(req, res, next) {
	res.json({success: 1});
});

module.exports = router;