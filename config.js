// адрес web-сервера
exports.web_server_url = "http://localhost:3000";

// типовые устройства
exports.types = {
	// дверь
	door: {
		commands: {
			close: {
				code:  0,
				name:  'close',
				title: 'закрыть',
			},
			open: {
				code:  1,
				name:  'open',
				title: 'открыть',
			},
		},
		events:   { },
		states:   {
			closed: {
				code:  0,
				name:  'closed',
				title: 'закрыта'
			},
			opened: {
				code:  1,
				name:  'opened',
				title: 'открыта'
			},
			no_info: {
				code:  2,
				name:  'no_info',
				title: 'не определён'
			},
		},
	},

	// аудиоплеер
	audio_player: {
		commands: {
			stop_channel_1: {
				code:  0,
				name:  'stop_channel_1',
				title: 'остановить канал 1',
			},
			play_channel_1: {
				code:  1,
				name:  'play_channel_1',
				title: 'включить канал 1',
			},
			play_channel_2: {
				code:  2,
				name:  'play_channel_2',
				title: 'включить канал 2',
			},
			stop_channel_2: {
				code:  3,
				name:  'stop_channel_2',
				title: 'остановить канал 2',
			},
		},
		events:   {
			ch1_playback_finished: {
				code:  0,
				name:  'ch1_playback_finished',
				title: 'воспроизведение на канале 1 завершено',
			},
			ch2_playback_finished: {
				code:  3,
				name:  'ch2_playback_finished',
				title: 'воспроизведение на канале 2 завершено',
			},
		},
		states:   {
			ch1_stop_ch2_stop: {
				code:  0,
				name:  'ch1_stop_ch2_stop',
				title: 'оба канала выключены',
			},
			ch1_play_ch2_stop: {
				code:  1,
				name:  'ch1_play_ch2_stop',
				title: 'включен 1 канал',
			},
			ch1_stop_ch2_play: {
				code:  2,
				name:  'ch1_stop_ch2_play',
				title: 'включен 2 канал',
			},
			ch1_play_ch2_play: {
				code:  3,
				name:  'ch1_play_ch2_play',
				title: 'оба канала включены',
			},
		},
	},

	// видеоплеер
	video_player: {
		commands: {
			stop: {
				code:  0,
				name:  'stop',
				title: 'остановить',
			},
			play: {
				code:  1,
				name:  'play',
				title: 'воспроизвести',
			},
		},
		events:   {
			playback_finished: {
				code:  0,
				name:  'playback_finished',
				title: 'воспроизведение завершено',
			},
		},
		states:   [ "stopped", "playing" ]
	},

	// ячейка
	cell: {
		commands: {
			close: {
				code:  0,
				name:  'close',
				title: 'закрыть',
			},
			open: {
				code:  1,
				name:  'open',
				title: 'открыть',
			},
		},
		events:   {
			code_entered: {
				code:  1,
				value: '',
				name:  'code_entered',
				title: 'введён код',
			},
		},
		states:   {
			closed: {
				code:  0,
				name:  'closed',
				title: 'закрыта'
			},
			opened: {
				code:  1,
				name:  'opened',
				title: 'открыта'
			},
		},
	}
};



// период wd в мс
exports.wd_timer = 1000;

// wd число возможных неответов
exports.wd_limit = 3;

// wd_timer*wd_limit/1000 = количество секунд, через которые 
// контроллер считается неответившим


if (REAL_MODE) {
	// список устройств
	exports.list = [

		// таймер
		{
			id:            127,
			carrier_id:    127,
			name:          "timer",
			title:         'Таймер',
			ip:            "localhost",
			port:          "3000",
			state:         "idle",
			wd_state:      exports.wd_limit,
			wd_enabled:    0,
			value:         5,
			current_value: "",
			commands:      {
				opened: {
					code:  0,
					name:  'opened',
					title: 'открыта'
				},
			},
			events:        {
				ready: {
					code:  0,
					name:  'ready',
					title: 'готов'
				},
			},
			states:        {
			},
			wd_emulate:    0,
			position:      {
				column:   1,
			},
		},

		// дверь 1
		{
			id:            0,
			carrier_id:    2,
			name:          "door_1",
			title:         'Дверь 1',
			type:          "door",
			ip:            "192.168.20.157",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 2
		{
			id:            0,
			carrier_id:    1,
			name:          "door_2",
			title:         'Дверь 2',
			type:          "door",
			ip:            "192.168.20.156",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 3
		{
			id:            2,
			carrier_id:    0,
			name:          "door_3",
			title:         'Дверь 3',
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 4
		{
			id:            1,
			carrier_id:    0,
			name:          "door_4",
			title:         'Дверь 4',
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 5
		{
			id:            0,
			carrier_id:    4,
			name:          "door_5",
			title:         'Дверь 5',
			type:          "door",
			ip:            "192.168.20.159",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 6
		{
			id:            0,
			carrier_id:    0,
			name:          "door_6",
			title:         'Дверь 6',
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 7
		{
			id:            1,
			carrier_id:    2,
			name:          "door_7",
			title:         'Дверь 7',
			type:          "door",
			ip:            "192.168.20.157",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// дверь 8
		{
			id:            2,
			carrier_id:    2,
			name:          "door_8",
			title:         'Дверь 8',
			type:          "door",
			//ip:            "192.168.20.157",
			ip:            "localhost",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    1,
			position:      {
				column:   3,
			}
		},

		// подсветка
		{
			id:            0,
			carrier_id:    8,
			name:          "inf_mirror_backlight",
			title:         'Подставка',
			ip:            "192.168.20.163",
			port:          "80",
			state:         "off",
			value:         "",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				off: {
					code:  0,
					name:  'off',
					title: 'выключить',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включить',
				},
			},
			events:        {
			},
			states:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключена',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включена',
				},
			},
		},

		// многогранник 
		{
			id:            0,
			carrier_id:    9,
			name:          "polyhedron",
			title:         'Многогранник',
			ip:            "192.168.20.168",
			port:          "80",
			state:         "disconnected",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				deactivate: {
					code:  0,
					name:  'deactivate',
					title: 'деактивировать',
				},
				activate: {
					code:  1,
					name:  'activate',
					title: 'активировать',
				},
			},
			events:        {
				disconnected: {
					code:  0,
					name:  'disconnected',
					title: 'разъединён',
				},
				activated: {
					code:  1,
					name:  'activated',
					title: 'активирован',
				},
				connected: {
					code:  2,
					name:  'connected',
					title: 'установлен',
				},
			},
			states:        {
				not_installed: {
					code:  0,
					name:  'not_installed',
					title: 'разъединён',
				},
				activated: {
					code:  1,
					name:  'activated',
					title: 'активирован',
				},
				installed_link_ok: {
					code:  2,
					name:  'installed_link_ok',
					title: 'установлен, связь есть',
				},
				installed_no_link: {
					code:  3,
					name:  'installed_no_link',
					title: 'установлен, связи нет',
				},
			},
		},

		// свет
		{
			id:            0,
			carrier_id:    10,
			name:          "light",
			title:         'Свет',
			ip:            "192.168.20.164",
			port:          "80",
			state:         "on",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				off: {
					code:  0,
					name:  'off',
					title: 'выключить',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включить',
				},
			},
			events:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключен',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включен',
				},
			},
			states:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключен',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включен',
				},
			},
		},

		// ремни
		{
			id:            0,
			carrier_id:    11,
			name:          "safety_belts",
			ip:            "192.168.20.167",
			port:          "80",
			state:         "number_of_fastened",
			value:         0,
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
			},
			events:        {
				number_of_fastened: {
					code:  1,
					value: 0,
					name:  'number_of_fastened',
					title: 'ремни пристегнуты',
				},
			},
			states:        {
				number_of_fastened: {
					code:  1,
					value: 0,
					name:  'number_of_fastened',
					title: 'ремни пристегнуты',
				},
			},
		},

		// вибрация
		{
			id:            1,
			carrier_id:    11,
			name:          "vibration",
			ip:            "192.168.20.167",
			port:          "80",
			state:         "off",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				off: {
					code:  0,
					name:  'off',
					title: 'выключить',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включить',
				},
			},
			events:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключена',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включена',
				},
			},
			states:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключена',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включена',
				},
			},
		},

		// ячейка 1
		{
			id:            0,
			carrier_id:    16,
			name:          "cell_1",
			ip:            "192.168.20.154",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			type:          "cell",
		},

		// ячейка 2
		{
			id:            0,
			carrier_id:    14,
			name:          "cell_2",
			ip:            "192.168.20.152",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			type:          "cell",
		},

		// ячейка 3
		{
			id:            0,
			carrier_id:    15,
			name:          "cell_3",
			ip:            "192.168.20.153",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			type:          "cell",
		},

		// ячейка 4
		{
			id:            0,
			carrier_id:    12,
			name:          "cell_4",
			ip:            "192.168.20.150",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			type:          "cell",
		},

		// ячейка 5
		{
			id:            0,
			carrier_id:    13,
			name:          "cell_5",
			ip:            "192.168.20.151",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			type:          "cell",
		},

		// фигура
		{
			id:            0,
			carrier_id:    17,
			name:          "figure",
			ip:            "192.168.20.169",
			port:          "80",
			state:         "number_of_inserted",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			value:         0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				backlight_off: {
					code:  0,
					name:  'backlight_off',
					title: 'выключить подсветку',
				},
				backlight_on: {
					code:  1,
					name:  'backlight_on',
					title: 'включить подсветку',
				},
			},
			events:        {
				number_of_inserted: {
					code:  1,
					value: 0,
					name:  'number_of_inserted',
					title: 'вставлено жетонов',
				},
			},
			states:        {
				number_of_inserted: {
					code:  1,
					value: 0,
					name:  'number_of_inserted',
					title: 'вставлено жетонов',
				},
			},
		},

		// шкаф с кнопкой и RFID картой
		{
			id:            0,
			carrier_id:    18,
			name:          "locker_2",
			ip:            "192.168.20.166",
			port:          "80",
			state:         "closed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands: {
				close: {
					code:  0,
					name:  'close',
					title: 'закрыть',
				},
				open: {
					code:  1,
					name:  'open',
					title: 'открыть',
				},
			},
			events:   { },
			states:   {
				closed: {
					code:  0,
					name:  'closed',
					title: 'закрыта'
				},
				opened: {
					code:  1,
					name:  'opened',
					title: 'открыта'
				},
			},
		},

		// считыватель RFID-карты
		{
			id:            0,
			carrier_id:    19,
			name:          "card_reader",
			ip:            "192.168.20.171",
			port:          "80",
			state:         "not_passed",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				reset: {
					code:  0,
					name:  'reset',
					title: 'сбросить',
				},
			},
			events:        {
				card_ok: {
					code:  1,
					name:  'card_ok',
					title: 'карта приложена',
				},
			},
			states:        {
				not_passed: {
					code:  0,
					name:  'not_passed',
					title: 'не пройдена',
				},
				passed: {
					code:  1,
					name:  'passed',
					title: 'пройдена',
				},
			},
		},

		// энергостена
		{
			id:            0,
			carrier_id:    20,
			name:          "power_wall",
			ip:            "192.168.20.170",
			port:          "80",
			state:         "not_passed",
			wd_state:      exports.wd_limit,
			wd_enabled:    0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
			},
			events:        {
				card_ok: {
					code:  1,
					name:  'power_ok',
					title: 'стена деактивирована',
				},
			},
			states:        {
				not_passed: {
					code:  0,
					name:  'not_passed',
					title: 'не пройдена',
				},
				passed: {
					code:  1,
					name:  'passed',
					title: 'пройдена',
				},
			},
		},

		// видеоплеер 1
		{
			id:            0,
			carrier_id:    666,
			name:          "video_player_1",
			type:          "video_player",
			//ip:            "192.168.20.205",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// видеоплеер 2
		{
			id:            0,
			carrier_id:    667,
			name:          "video_player_2",
			type:          "video_player",
			//ip:            "192.168.20.206",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// видеоплеер 3
		{
			id:            0,
			carrier_id:    668,
			name:          "video_player_3",
			type:          "video_player",
			//ip:            "192.168.20.204",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// терминал ввода персонального кода
		{
			id:            0,
			carrier_id:    865,
			name:          "terminal_1",
			ip:            "192.168.20.180",
			port:          "8070",
			state:         "sleep",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			value:         "",
			commands:      {
				black_screen: {
					code:  0,
					name:  'black_screen',
					title: 'выключить',
				},
				go: {
					code:  1,
					name:  'go',
					title: 'включить',
				},
			},
			events:        {
				code_entered: {
					code:  1,
					name:  'code_entered',
					title: 'введён код',
				},
			},
			states:        {
				sleep: {
					code:  0,
					name:  'sleep',
					title: 'спящий режим',
				},
				active: {
					code:  1,
					name:  'active',
					title: 'активен',
				},
			},
		},

		// терминал поиска зелёных квадратов
		{
			id:            0,
			carrier_id:    866,
			name:          "terminal_2",
			ip:            "192.168.20.181",
			port:          "8070",
			state:         "sleep",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			value:         "",
			commands:      {
				black_screen: {
					code:  0,
					name:  'black_screen',
					title: 'выключить',
				},
				go: {
					code:  1,
					name:  'go',
					title: 'включить',
				},
			},
			events:        {
				game_failed: {
					code:  0,
					name:  'game_failed',
					title: 'игра провалена',
				},
				game_passed: {
					code:  1,
					name:  'game_passed',
					title: 'игра пройдена',
				},
			},
			states:        {
				sleep: {
					code:  0,
					name:  'sleep',
					title: 'спящий режим',
				},
				active: {
					code:  1,
					name:  'active',
					title: 'активен',
				},
			},
		},

		// терминал игры светлячок
		{
			id:            0,
			carrier_id:    867,
			name:          "terminal_3",
			ip:            "192.168.20.183",
			port:          "8070",
			state:         "sleep",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			value:         "",
			commands:      {
				black_screen: {
					code:  0,
					name:  'black_screen',
					title: 'выключить',
				},
				go: {
					code:  1,
					name:  'go',
					title: 'включить',
				},
			},
			events:        {
				game_passed: {
					code:  1,
					name:  'game_passed',
					title: 'игра пройдена',
				},
			},
			states:        {
				sleep: {
					code:  0,
					name:  'sleep',
					title: 'спящий режим',
				},
				active: {
					code:  1,
					name:  'active',
					title: 'активен',
				},
			},
		},

		// терминал ввода кординат
		{
			id:            0,
			carrier_id:    868,
			name:          "terminal_4",
			ip:            "192.168.20.182",
			port:          "8070",
			state:         "sleep",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   2,
			},
			value:         "",
			commands:      {
				black_screen: {
					code:  0,
					name:  'black_screen',
					title: 'выключить',
				},
				go: {
					code:  1,
					name:  'go',
					title: 'включить',
				},
			},
			events:        {
				coordinates_entered_fail: {
					code:  0,
					name:  'coordinates_entered_fail',
					title: 'координаты введены неверно',
				},
				coordinates_entered_true: {
					code:  1,
					name:  'coordinates_entered_true',
					title: 'координаты введены верно',
				},
			},
			states:        {
				sleep: {
					code:  0,
					name:  'sleep',
					title: 'спящий режим',
				},
				active: {
					code:  1,
					name:  'active',
					title: 'активен',
				},
			},
		},

		// аудиоплеер 1
		{
			id:            0,
			carrier_id:    768,
			name:          "audio_player_1",
			type:          "audio_player",
			ip:            "192.168.20.193",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// аудиоплеер 2
		{
			id:            0,
			carrier_id:    767,
			name:          "audio_player_2",
			type:          "audio_player",
			ip:            "192.168.20.192",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// аудиоплеер 3
		{
			id:            0,
			carrier_id:    766,
			name:          "audio_player_3",
			type:          "audio_player",
			ip:            "192.168.20.191",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},


		// аудиоплеер 4
		{
			id:            0,
			carrier_id:    765,
			name:          "audio_player_4",
			type:          "audio_player",
			ip:            "192.168.20.190",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   4,
			},
			value:         ""
		},

		// дым машина
		{
			id:            0,
			carrier_id:    21,
			name:          "smoke",
			ip:            "192.168.20.165",
			port:          "80",
			state:         "off",
			wd_state:      exports.wd_limit,
			wd_enabled:    1,
			sv_port:       0,
			wd_emulate:    0,
			position:      {
				column:   1,
			},
			commands:      {
				off: {
					code:  0,
					name:  'off',
					title: 'выключить',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включить',
				},
			},
			events:        {
			},
			states:        {
				off: {
					code:  0,
					name:  'off',
					title: 'выключена',
				},
				on: {
					code:  1,
					name:  'on',
					title: 'включена',
				},
			},
		},

	];
}

// инициализируем типы
for (var i = 0; i < exports.list.length; i++) {
	var config_item = exports.list[i];
	var type = config_item.type;
	if (type) {
		var type_item = exports.types[type];
		config_item.commands = type_item.commands;
		config_item.events   = type_item.events;
		config_item.states   = type_item.states;
	}
}

exports.colors = [
	'red', //0 
	'green',
	'yellow',
];

// для меня
exports.files = [
	'audio20', //0 
	'video12',
	'video2',
	'video3',
	'audio2',
	'video4', //5
	'audio3',
	'video5',
	'audio4',
	'video6', 
	'audio6', //10
	'audio7',
	'audio8',
	'audio9',
	'audio10',
	'audio11',//15
	'audio12',
	'video8',
	'video9',
	'video10',
	'audio13',//20
	'video11',
	'video12',
	'video1',
	'audio21',
];

exports.player_files =[
	"pl_audio1",
	"pl_audio2",
	"pl_audio3",
	"pl_audio4",
	"pl_audio5",
];

exports.color_files =[
	"col_audio1",
	"col_audio2",
	"col_audio3",
	"col_audio4",
	"col_audio5",
];

exports.video_files = [
	{}, // empty
	{
		alias:       'video1',
		description: 'подсказка о том, как активировать многогранник',
		value:       'file=mnt/sda1/6.mp4&repeat=0',
	},
	{
		alias:       'video2',
		description: 'видео с говноклипами',
		value:       'file=mnt/sdcard/TV/9.mp4&repeat=0',
	},
	{
		alias:       'video3',
		description: 'звездное небо',
		value:       'file=mnt/sdcard/TV/8.mp4&repeat=0',
	},
	{
		alias:       'video4',
		description: 'не считайте себя похищенными, пристегните ремни',
		value:       'file=mnt/sdcard/TV/1.mp4&repeat=0',
	},
	{
		alias:       'video5',
		description: 'межзвездный прыжок',
		value:       'file=mnt/sda1/7.mp4&repeat=0',
	},
	{
		alias:       'video6',
		description: 'прилетели, ннада подтвердить избранность',
		value:       'file=mnt/sdcard/TV/2.mp4&repeat=10',
	},
	{
		alias:       'video7',
		description: 'посмотрите свои любимые клипы',
		value:       'file=mnt/sdcard/TV/3.mp4&repeat=0',
	},
	{
		alias:       'video8',
		description: 'отдохните',
		value:       'file=mnt/sdcard/TV/4.mp4&repeat=0',
	},
	{
		alias:       'video9',
		description: 'вам угрожает опасность',
		value:       'file=mnt/sdcard/TV/5.mp4&repeat=0',
	},
	{
		alias:       'video10',
		description: 'статичные символы',
		value:       'file=mnt/sda1/10.mp4&repeat=0',
	},
	{
		alias:       'video11',
		description: 'crazy_frog',
		value:       'file=mnt/sda1/11.mp4&repeat=0',
	},
	{
		alias:       'video12',
		description: 'crazy_frog2',
		value:       'file=mnt/sda1/12.mp4&repeat=0',
	},
	{
		alias:       'video13',
		description: 'mults',
		value:       'file=mnt/sda1/13.mp4&repeat=0',
	},
];

exports.audio_files = [
	{}, // empty
	{
		alias:       'audio1',
		description: 'экипаж готов, начинаем межзвездный перелет',
		value:       'file=mnt/sdcard/Audio/audio1.mp3&repeat=0',
	},
	{
		alias:       'audio2',
		description: 'прилетели',
		value:       'file=mnt/sdcard/Audio/audio2.mp3&repeat=0',
	},
	{
		alias:       'audio3',
		description: 'игрок 1, го сканироваться',
		value:       'file=mnt/sdcard/Audio/audio3.mp3&repeat=0',
	},
	{
		alias:       'audio4',
		description: 'игрок 2, го сканироваться',
		value:       'file=mnt/sdcard/Audio/audio4.mp3&repeat=0',
	},
	{
		alias:       'audio5',
		description: 'игрок 3, го сканироваться',
		value:       'file=mnt/sdcard/Audio/audio5.mp3&repeat=0',
	},
	{
		alias:       'audio6',
		description: 'игрок 4, го сканироваться',
		value:       'file=mnt/sdcard/Audio/audio6.mp3&repeat=0',
	},
	{
		alias:       'audio7',
		description: 'придумайте и введите пароль',
		value:       'file=mnt/sdcard/Audio/audio7.mp3&repeat=0',
	},
	{
		alias:       'audio8',
		description: 'в очередь, сукины дети',
		value:       'file=mnt/sdcard/Audio/audio8.mp3&repeat=0',
	},
	{
		alias:       'audio9',
		description: 'предварительное сканирование завершено, ты красный',
		value:       'file=mnt/sdcard/Audio/audio9.mp3&repeat=0',
	},
	{
		alias:       'audio10',
		description: 'предварительное сканирование завершено, ты зеленый',
		value:       'file=mnt/sdcard/Audio/audio10.mp3&repeat=0',
	},
	{
		alias:       'audio11',
		description: 'предварительное сканирование завершено, ты желтый',
		value:       'file=mnt/sdcard/Audio/audio11.mp3&repeat=0',
	},
	{
		alias:       'audio12',
		description: 'подождите минутку',
		value:       'file=mnt/sdcard/Audio/audio12.mp3&repeat=0',
	},
	{
		alias:       'audio13',
		description: 'вы не прошли сканирование',
		value:       'file=mnt/sdcard/Audio/audio13.mp3&repeat=0',
	},
	{
		alias:       'audio14',
		description: 'укажите зеленые квадраты',
		value:       'file=mnt/sdcard/Audio/audio14.mp3&repeat=0',
	},
	{
		alias:       'audio15',
		description: 'неверно введены квадратики',
		value:       'file=mnt/sdcard/Audio/audio15.mp3&repeat=0',
	},
	{
		alias:       'audio16',
		description: 'верно введены квадратики',
		value:       'file=mnt/sdcard/Audio/audio16.mp3&repeat=0',
	},
	{
		alias:       'audio17',
		description: 'восстание',
		value:       'file=mnt/sdcard/Audio/audio17.mp3&repeat=0',
	},
	{
		alias:       'audio18',
		description: 'квест пройден',
		value:       'file=mnt/sdcard/Audio/audio18.mp3&repeat=0',
	},
	{
		alias:       'audio19',
		description: 'фоновый звук',
		value:       'file=mnt/sdcard/Audio/audio19.wav&repeat=1',
	},
	{
		alias:       'audio20',
		description: 'предварительное сканирование завершено для изгоя, без озвучивания цвета',
		value:       'file=mnt/sdcard/Audio/audio20.mp3&repeat=0',
	},
	{
		alias:       'audio21',
		description: 'тревога',
		value:       'file=mnt/sdcard/Audio/audio21.mp3&repeat=0',
	},
	{
		alias:       'audio22',
		description: 'легенда',
		value:       'file=mnt/sdcard/Audio/audio22.mp3&repeat=0',
	},
	{
		alias:       'audio23',
		description: 'треск и искры',
		value:       'file=mnt/sdcard/Audio/audio23.wav&repeat=1',
	},
	{
		alias:       'audio24',
		description: 'треск и искры',
		value:       'file=mnt/sdcard/Audio/audio24.mp3&repeat=0',
	},
];



// время таймера
exports.default_timer_value = '1';
exports.timeouts = {
	T1: 5,
	T2: 5,
	T3: 5,
	T4: 5,
	T5: 5,
	A:  3,
	B:  15,
	C:  8,
	D:  5,
	E:  3,
	CHECK_TIME: 10,
	SOCKET_WAIT_TIME: 3,
	DEVICE_RELOAD_TIME: 2,
}

// watchdog
exports.watchdog_enabled = 1;
exports.enable_reload = 1;

// правильные координаты
exports.coordinates = '9847544';

// порт для включения/выключения arduino
exports.port_num = '4';

exports.wd_error_timeout = 100;
exports.wd_multiplicator = 1;

exports.mutex_timeout = 500;
exports.mutex_repeats_count = 5;