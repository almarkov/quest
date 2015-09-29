var express = require('express');
var router = express.Router();
var http   = require('http');
//var devices = require('./devices.js');

// запрос состояния конфига
router.get('/config', function(req, res, next) {
	res.json(config.list);
});

// запрос состояния модели
router.get('/all', function(req, res, next) {

	// проверяем окончание времени
	var now = new Date();
	if (gamers.start_time && gamers.game_state != 'quest_failed') {
		if ((now - gamers.start_time - 60*60*1000) > 0) {
			http.get(config.web_server_url + "/game/time_ended",
				function(res) {
					simple_log("time_ended ok");
				}).on('error', function(e) {
					simple_log("time_ended error");
			});
		}
	}
	
	// передача модели в GUI
	var result = {};
	for (var i = 0; i < devices.list.length; i++) {
		result[devices.list[i].name] = devices.list[i];
	}

	//result.quest_state = gamers.get_game_state();

	result.codes = gamers.codes;


	if (gamers.start_time) {
		var now = new Date();
		var diff = gamers.start_time - now + 60*60*1000 ;
		var ms = diff % 1000;
		s  = ((diff - ms)/1000) % 60;
		m  = ((diff - ms - s* 1000)/60000) % 60;
		result.game_timer = ('0' + m).slice(-2)	+ ':' + ('0' + s).slice(-2);
	} else {
		result.game_timer = 'NA';
	}

	result.quest_error = gamers.quest_error;

	result.last_player_pass = gamers.last_player_pass;

	result.active_button = gamers.active_button;

	result.gamers_count = gamers.count;

	result.quest_completed = (gamers.game_state == 'quest_completed' ? 1 : 0);

	//result.timer_state = timers.get();

	result.devices = devices.list;


	// !!!!!! сделать адаптивно - отправлять только изменения!!!
	result.face = face.get();

	result.dashboard_buttons = [];
	for (var button in gamers.dashboard_buttons) {
		if (gamers.dashboard_buttons[button]) {
			result.dashboard_buttons.push(button);
		}
	}


	res.json(result);

});

module.exports = router;