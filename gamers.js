exports.count = 0;

exports.game_states = {
	server_started: {
		title: 'Сервер запущен',
		arg: '',
		args: [],
	},
	devices_off: {
		title: 'Устройства выключаются',
		arg: '',
		args: [],
	},
	devices_on: {
		title: 'Устройства включаются',
		arg: '',
		args: [],
	},
	devices_check: {
		title: 'Проверка устройств',
		arg: '',
		args: [],
	},
	devices_error: {
		title: 'Сбои в работе устройств: $0 Запуск квеста нежелателен',
		arg: '',
		args: [],
	},
	devices_ok: {
		title: 'Все устройства работают нормально',
		arg: '',
		args: [],
	},
	preparation: {
		title: 'Идет подготовка к запуску квеста',
		arg: '',
		args: [],
	},
	service_mode: {
		title: 'Идет обслуживание квеста',
		arg: '',
		args: [],
	},
	ready_to_go: {
		title: 'Квест готов к запуску',
		arg: '',
		args: [],
	},
	opening_door_1_and_waiting: {
		title: 'Открытие двери 1 и ожидание, пока все игроки зайдут внутрь',
		arg: '',
		args: [],
	},
	closing_door_1: {
		title: 'Закрытие двери 1 за игроками',
		arg: '',
		args: [],
	},
	gamers_connecting_polyhedron: {
		title: 'Игроки должны поставить многогранник на подставку',
		arg: '',
		args: [],
	},
	gamers_activating_polyhedron: {
		title: 'Игроки должны активировать многогранник',
		arg: '',
		args: [],
	},
	gamers_watching_prepare_video: {
		title: 'Игроки смотрят видео, на котором их просят приготовиться к перелету',
		arg: '',
		args: [],
	},
	gamers_sitting_and_fasten: {
		title: 'Игроки должны сесть и пристегнуться',
		arg: '',
		args: [],
	},
	playing_ready_to_flight: {
		title: 'Играет аудио о том, что экипаж готов к перелету',
		arg: '',
		args: [],
	},
	flight: {
		title: 'Перелет',
		arg: '',
		args: [],
	},
	gamers_watch_video_scan_invitation: {
		title: 'Прилетели. Игроки смотрят видео с приглашением пройти сканирование',
		arg: '',
		args: [],
	},
	scan_invitation: {
		title: 'Приглашение на сканирование игрока №arg из Y. Убедитесь, что в комнате сканирования только один игрок, и нажмите кнопку «сканировать»',
		arg: '',
		args: [],
	},
	scaning_gamer: {
		title: 'Идет сканирование игрока №arg',
		arg: '',
		args: [],
	},
	scaning_outlaw_ended: {
		title: 'Сканирование игрока №arg(изгоя) завершено, после перехода нажмите «Закончить сканирование»',
		arg: '',
		args: [],
	},
	scaning_not_outlaw_ended: {
		title: 'Сканирование игрока №arg(не изгоя) завершено, после перехода нажмите «Закончить сканирование»',
		arg: '',
		args: [],
	},
	scaning_outlaw_ending: {
		title: 'Сканирование игрока arg(изгоя) завершается…»',
		arg: '',
		args: [],
	},
	scaning_not_outlaw_ending: {
		title: 'Сканирование игрока arg(не изгоя) завершается…»',
		arg: '',
		args: [],
	},
	gamers_gathered_to_save_outlaw: {
		title: 'Игроки снова собрались вместе после сканирования и должны спасти изгоя',
		arg: '',
		args: [],
	},
	gamers_saved_outlaw: {
		title: 'Игроки спасли изгоя, ожидание, пока он присоединится к ним»',
		arg: '',
		args: [],
	},
	gamers_together: {
		title: 'Игроки в полном составе и вот-вот попадут в комнату отдыха',
		arg: '',
		args: [],
	},
	gamers_in_restroom: {
		title: 'Игроки в комнате отдыха',
		arg: '',
		args: [],
	},
	gamers_opening_cells: {
		title: 'Игроки должны открыть ячейки, открыто arg из Z',
		arg: '',
		args: [],
	},
	gamers_opened_cells: {
		title: 'Игроки открыли ячейки и теперь должны правильно вставить их в статую',
		arg: '',
		args: [],
	},
	gamers_opened_cube_with_RFID: {
		title: 'Игроки открыли кубик с RFID картой, должны взять ее и открыть дверь в коридор',
		arg: '',
		args: [],
	},
	gamers_in_hallway: {
		title: 'Игроки в коридоре',
		arg: '',
		args: [],
	},
	gamers_in_powerwall_room: {
		title: 'Игроки в комнате с энергостеной',
		arg: '',
		args: [],
	},
	gamers_returned_in_first_room: {
		title: 'Игроки вернулись в самую первую комнату, звучит сирена, а потом видео с предостережением об опасности и о восстании',
		arg: '',
		args: [],
	},
	gamers_entering_coordinates: {
		title: 'Игроки вводят координаты',
		arg: '',
		args: [],
	},
	quest_completed: {
		title: 'Квест пройден. Время прохождения – arg мин',
		arg: '',
		args: [],
	},
	quest_failed: {
		title: 'Квест провален',
		arg: '',
		args: [],
	},

};
exports.game_state = 'server_started';

exports.set_game_state = function(state, args){
	exports.game_state = state;
	exports.game_states[state].args = args;
};

exports.get_game_state = function(){
	var current_state = exports.game_states[exports.game_state];
	simple_log(current_state.title);
	var status = current_state.title;
	current_state.args.forEach(function(arg, index){
		status = status.replace('$' + index, arg);
	});
	simple_log(status);
	return status;
}

exports.start_time = null;

exports.quest_state = 0;

exports.last_player_pass = 0;

exports.quest_error = '';

exports.videos_played = 0;

exports.codes = ['', '', '', '', '423', '', '', '', ''];

exports.coordinates = '';

exports.fastened_count = 0;

exports.wd_on = 0;

exports.intervalObject = null;

// активная кнопка для оператора
exports.active_button = '';

// доступные для нажатия кнопки
exports.dashboard_buttons = {
	GetReady:         0,
	Start:            0,
	ServiceMode:      0,
	ResetGame:        1,
	AllIn:            0,
	StartScan:        0,
	StopScan:         0,
	StopScanAll:      0,
	ClosePowerWall:   0,
	PolyhedronPrompt: 0,
	Queue:            0,
};



// сброс значений
exports.reset = function() {
	exports.quest_state = 0;
	exports.last_player_pass = 0;
	exports.quest_error = '';
	exports.codes = ['', '', '', '', '423', '', '', '', ''];
	exports.count = 0;
	exports.active_button = '';
	exports.videos_played = 0;
	exports.wd_on = 0;
	exports.game_state = 'server_started';
	exports.fastened_count = 0;
	exports.dashboard_buttons = {
		GetReady:         0,
		Start:            0,
		ServiceMode:      0,
		ResetGame:        1,
		AllIn:            0,
		StartScan:        0,
		StopScan:         0,
		StopScanAll:      0,
		ClosePowerWall:   0,
		PolyhedronPrompt: 0,
		Queue:            0,
	};
	exports.start_time = null;
	if (exports.intervalObject) {
		clearInterval(exports.intervalObject);
	}
	exports.intervalObject = null;
}
