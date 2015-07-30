exports.count = 0;

exports.quest_states = [
	'Проверка исправности всех устройств',             // 0
	'Все устроства работают нормально',                // 1
	'Все устроства работают нормально',                // 2
	'Идёт обслуживание',                               // 3
	'',
	'Квест готов к запуску',                           // 5
	'','','','',
	'Начало квеста',                                   // 10
	'','','','',
	'Ожидание открытия двери 1',                       // 15
	'Ожидание, пока все игроки войдут внутрь. Требуется действие оператора. Когда все игроки войдут – нажмите кнопку «Все игроки зашли внутрь»', //16
	'','','',
	'Ожидание закрытия двери 1',                       // 20
	'','','','','','','','','',
	'Ожидание открытия двери 2',                       // 30
	'','','','','','','','','',
	'Поиск кнопки, открывающей шкаф с многогранником', // 40
	'','','','',
	'Ожидание, пока игроки поставят многогранник на подставку', // 45,
	'','','','',
	'Ожидание, пока игроки активируют многогранник',   // 50
	'','','','','','','','','',
	'Подготовка к перелёту',                           // 60
	'','','','','','','','','',
	'Перелёт',                                         // 70
	'','','','',
	'Прилетели',                                       // 75
	'','','','',
	'Стыковка',                                        // 80
	'','','','',
	'Стыковка',                                        // 85 - фиктивный(коничилось либо аудио, либо видео)
	'','','','',
	'Стыковка',                                        // 90
	'','','','','','','','','',
	'Приглашение на сканирование',                     // 100
	'Приглашение на сканирование',                     // 101
	'Приглашение на сканирование',                     // 102
	'Приглашение на сканирование',                     // 103
	'Приглашение на сканирование',                     // 104
	'Приглашение на сканирование',                     // 105
	'Приглашение на сканирование',                     // 106
	'Приглашение на сканирование',                     // 107
	'Приглашение на сканирование',                     // 108
	'Приглашение на сканирование',                     // 109
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 110
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 111
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 112
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 113
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 114
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 115
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 116
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 117
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 118
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 119
	'Идет сканирование игрока ',                       // 120
	'Идет сканирование игрока ',                       // 121
	'Идет сканирование игрока ',                       // 122
	'Идет сканирование игрока ',                       // 123
	'Идет сканирование игрока ',                       // 124
	'Идет сканирование игрока ',                       // 125
	'Идет сканирование игрока ',                       // 126
	'Идет сканирование игрока ',                       // 127
	'Идет сканирование игрока ',                       // 128
	'Идет сканирование игрока ',                       // 129
	'Игрок №1 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 130
	'Игрок №2 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 131
	'Игрок №3 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 132
	'Игрок №4 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 133
	'Игрок №5 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 134
	'Игрок №6 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 135
	'Игрок №7 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 136
	'Игрок №8 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 137
	'Игрок №9 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 138
	'',                                                // 139
	'Сканирование закончено. Игроки должны спасти коллегу, попавшего в комнату аннигиляции.',      // 140
	'Сканирование закончено. Игроки должны спасти коллегу, попавшего в комнату аннигиляции.',      // 141
	'Все игроки снова собрались вместе, и вот-вот попадут во дворец благоденствия',                // 142
	'Осталось просканировать',                         // 143
	'Осталось просканировать',                         // 144
	'Все игроки снова собрались вместе и приглашаются во дворец благоденствия»',                   // 145
	'Осталось просканировать',                         // 146
	'Осталось просканировать',                         // 147
	'Осталось просканировать',                         // 148
	'Осталось просканировать',                         // 149
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 0 ячеек из 5',     // 150
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 1 ячеек из 5',     // 151
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 2 ячеек из 5',     // 152
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 3 ячеек из 5',     // 153
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 4 ячеек из 5',     // 154
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 5 ячеек из 5',     // 155
	'','','','',
	'Игроки достали жетоны, им необходимо вставить их в статую',         // 160
	'','','','','','','','','',
	'Игроки получили ключ от двери в коридор',           // 170
	'','','','','','','','','',
	'Игроки в коридоре',                                 // 180
	'','','','','','','','','',
	'Игроки в комнате с энергостеной',                   // 190
	'','','','','','','','','',
	'Игроки вернулись в комнату2.',                   // 200
	'','','','','','','','','',
	'Игроки вводят координаты',                          // 210
	'','','','','','','','','',
	'Подготовка к перелёту',                          // 220
	'','','','','','','','','',
	'Перелёт',                          // 230
	'','','','','','','','','',
	'Квест пройден',                          // 240
	
];

exports.game_states = {
	server_started: {
		title: 'Сервер запущен',
		arg: '',
	},
	devices_off: {
		title: 'Устройства выключаются',
		arg: '',
	},
	devices_on: {
		title: 'Устройства включаются',
		arg: '',
	},
	devices_check: {
		title: 'Проверка устройств',
		arg: '',
	},
	devices_error: {
		title: 'Сбои в работе устройств: arg Запуск квеста невозможен',
		arg: '',
	},
	devices_ok: {
		title: 'Все устройства работают нормально',
		arg: '',
	},
	preparation: {
		title: 'Идет подготовка к запуску квеста',
		arg: '',
	},
	service_mode: {
		title: 'Идет обслуживание квеста',
		arg: '',
	},
	ready_to_go: {
		title: 'Квест готов к запуску',
		arg: '',
	},
	opening_door_1_and_waiting: {
		title: 'Открытие двери 1 и ожидание, пока все игроки зайдут внутрь',
		arg: '',
	},
	closing_door_1: {
		title: 'Закрытие двери 1 за игроками',
		arg: '',
	},
	gamers_connecting_polyhedron: {
		title: 'Игроки должны поставить многогранник на подставку',
		arg: '',
	},
	gamers_activating_polyhedron: {
		title: 'Игроки должны активировать многогранник',
		arg: '',
	},
gamers_watching_prepare_video: {
		title: 'Игроки смотрят видео, на котором их просят приготовиться к перелету',
		arg: '',
	},
	gamers_sitting_and_fasten: {
		title: 'Игроки должны сесть и пристегнуться',
		arg: '',
	},
	playing_ready_to_flight: {
		title: 'Играет аудио о том, что экипаж готов к перелету',
		arg: '',
	},
	flight: {
		title: 'Перелет',
		arg: '',
	},
	gamers_watch_video_scan_invitation: {
		title: 'Прилетели. Игроки смотрят видео с приглашением пройти сканирование',
		arg: '',
	},
	scan_invitation: {
		title: 'Приглашение на сканирование игрока №arg из Y. Убедитесь, что в комнате сканирования только один игрок, и нажмите кнопку «сканировать»',
		arg: '',
	},
	scaning_gamer: {
		title: 'Идет сканирование игрока №arg',
		arg: '',
	},
	scaning_outlaw_ended: {
		title: 'Сканирование игрока №arg(изгоя) завершено, после перехода нажмите «Закончить сканирование»',
		arg: '',
	},
	scaning_not_outlaw_ended: {
		title: 'Сканирование игрока №arg(не изгоя) завершено, после перехода нажмите «Закончить сканирование»',
		arg: '',
	},
	scaning_outlaw_ending: {
		title: 'Сканирование игрока arg(изгоя) завершается…»',
		arg: '',
	},
	scaning_not_outlaw_ending: {
		title: 'Сканирование игрока arg(не изгоя) завершается…»',
		arg: '',
	},
	gamers_gathered_to_save_outlaw: {
		title: 'Игроки снова собрались вместе после сканирования и должны спасти изгоя',
		arg: '',
	},
	gamers_saved_outlaw: {
		title: 'Игроки спасли изгоя, ожидание, пока он присоединится к ним»',
		arg: '',
	},
	gamers_together: {
		title: 'Игроки в полном составе и вот-вот попадут в комнату отдыха',
		arg: '',
	},
	gamers_in_restroom: {
		title: 'Игроки в комнате отдыха',
		arg: '',
	},
	gamers_opening_cells: {
		title: 'Игроки должны открыть ячейки, открыто arg из Z',
		arg: '',
	},
	gamers_opened_cells: {
		title: 'Игроки открыли ячейки и теперь должны правильно вставить их в статую',
		arg: '',
	},
	gamers_opened_cube_with_RFID: {
		title: 'Игроки открыли кубик с RFID картой, должны взять ее и открыть дверь в коридор',
		arg: '',
	},
	gamers_in_hallway: {
		title: 'Игроки в коридоре',
		arg: '',
	},
	gamers_in_powerwall_room: {
		title: 'Игроки в комнате с энергостеной',
		arg: '',
	},
	gamers_returned_in_first_room: {
		title: 'Игроки вернулись в самую первую комнату, звучит сирена, а потом видео с предостережением об опасности и о восстании',
		arg: '',
	},
	gamers_entering_coordinates: {
		title: 'Игроки вводят координаты',
		arg: '',
	},
	quest_completed: {
		title: 'Квест пройден. Время прохождения – arg мин',
		arg: '',
	},
	quest_failed: {
		title: 'Квест провален',
		arg: '',
	},

};
exports.game_state = 'server_started';

exports.set_game_state = function(state, arg){
	exports.game_state = state;
	exports.game_states[state].arg = arg;
};

exports.get_game_state = function(){
	var current_state = exports.game_states[exports.game_state];
	simple_log(current_state.title);
	var status = current_state.title.replace('arg', current_state.arg);
	status = status.replace('Y', exports.count.toString());
	status = status.replace('Z', (exports.count+1).toString());
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
	};
	exports.start_time = null;
	if (exports.intervalObject) {
		clearInterval(intervalObject);
	}
	exports.intervalObject = null;
}
