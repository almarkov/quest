// адрес МК - может  быть несколько

// надо прописать для каждого
// надо сделать,	чтобы адрес устройства вычисляся так:
// url = "http://<ip>:<port>" || "<url>",	т.е. можно указать либо ip+port,	либо url
exports.dev_url = "http://localhost:3000";

exports.arduino_list = {

};

exports.types = {
	door: {
		commands: [ "close", "open"],
		events:   [ ],
		states:   [ "closed", "opened"]
	},
	audio_player: {
		commands: [ "stop_channel_1", "play_channel_1", "play_channel_2", "stop_channel_2" ],
		events:   [ "ch1_playback_finished", "", "", "ch2_playback_finished" ],
		states:   [ "ch1_stop_ch2_stop", "ch1_play_ch2_stop", "ch1_stop_ch2_play", "ch1_play_ch2_play" ]
	},
	video_player: {
		commands: [ "stop", "play" ],
		events:   [ "playback_finished" ],
		states:   [ "stopped", "playing" ]
	},
	cell: {
		commands: [ "close", "open" ],
		events:   [ "", "code_entered"],
		states:   [ "closed", "opened"],
	}
};
if (REAL_MODE) {
	// список устройств
	exports.list = [

		// таймер
		{
			id:            127,
			carrier_id:    127,
			name:          "timer",
			ip:            "localhost",
			port:          "3000",
			state:         "idle",
			wd_state:      1,
			wd_enabled:    1,
			value:         5,
			current_value: "",
			commands:      [ "activate" ],
			events:        [ "ready" ]
		},

		// дверь 1
		{
			id:            0,
			carrier_id:    2,
			name:          "door_1",
			type:          "door",
			ip:            "192.168.20.157",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 2
		{
			id:            0,
			carrier_id:    1,
			name:          "door_2",
			type:          "door",
			ip:            "192.168.20.156",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 3
		{
			id:            2,
			carrier_id:    0,
			name:          "door_3",
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 4
		{
			id:            1,
			carrier_id:    0,
			name:          "door_4",
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 5
		{
			id:            0,
			carrier_id:    4,
			name:          "door_5",
			type:          "door",
			ip:            "192.168.20.159",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 6
		{
			id:            0,
			carrier_id:    0,
			name:          "door_6",
			type:          "door",
			ip:            "192.168.20.155",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 7
		{
			id:            1,
			carrier_id:    2,
			name:          "door_7",
			type:          "door",
			ip:            "192.168.20.157",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 8
		{
			id:            2,
			carrier_id:    2,
			name:          "door_8",
			type:          "door",
			ip:            "192.168.20.157",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// подсветка
		{
			id:            0,
			carrier_id:    8,
			name:          "inf_mirror_backlight",
			ip:            "192.168.20.163",
			port:          "80",
			state:         "off",
			value:         "",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			states:        [ "off", "on" ],	
		},

		// многогранник 
		{
			id:            0,
			carrier_id:    9,
			name:          "polyhedron",
			ip:            "192.168.20.168",
			port:          "80",
			state:         "disconnected",
		    wd_state:      1,
			wd_enabled:    1,
			commands:      [ "deactivate", "activate" ],
			events:        [ "disconnected", "activated", "connected" ],
			states:        [ "disconnected", "activated",  "connected"],
		},

		// свет
		{
			id:            0,
			carrier_id:    10,
			name:          "light",
			ip:            "192.168.20.164",
			port:          "80",
			state:         "on",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			events:        [ "off", "on" ],
			states:        [ "off", "on" ],
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
			wd_state:      1,
			wd_enabled:    1,
			events:        [ "", "number_of_fastened" ],
			states:        [ "number_of_fastened" ],
		},

		// вибрация
		{
			id:            1,
			carrier_id:    11,
			name:          "vibration",
			ip:            "192.168.20.167",
			port:          "80",
			state:         "off",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			events:        [ "off", "on" ],
			states:        [ "off", "on" ],
		},

		// ячейка 1
		{
			id:            0,
			carrier_id:    16,
			name:          "cell_1",
			ip:            "192.168.20.154",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
			value:         0,
			commands:      [ "backlight_off", "backlight_on" ],
			events:        [ "", "number_of_inserted" ],
			states:        [ "", "number_of_inserted" ],
		},

		// шкаф с кнопкой и RFID картой
		{
			id:            0,
			carrier_id:    18,
			name:          "locker_2",
			ip:            "192.168.20.166",
			port:          "80",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "close", "open" ],
			states:        [ "closed", "opened" ],	
		},

		// считыватель RFID-карты
		{
			id:            0,
			carrier_id:    19,
			name:          "card_reader",
			ip:            "192.168.20.171",
			port:          "80",
			state:         "not_passed",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "reset" ],
			events:        [ "", "card_ok" ], 
			states:        [ "not_passed", "passed" ],	
		},

		// энергостена
		{
			id:            0,
			carrier_id:    20,
			name:          "power_wall",
			ip:            "192.168.20.170",
			port:          "80",
			state:         "not_passed",
			wd_state:      1,
			wd_enabled:    1,
			events:        [ "", "power_ok" ], 
			states:        [ "not_passed", "passed" ],	
		},

		// видеоплеер 1
		{
			id:            0,
			carrier_id:    '666',
			name:          "video_player_1",
			type:          "video_player",
			ip:            "192.168.20.205",
			port:          "8070",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// видеоплеер 2
		{
			id:            0,
			carrier_id:    '667',
			name:          "video_player_2",
			type:          "video_player",
			ip:            "192.168.20.206",
			port:          "8070",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// видеоплеер 3
		{
			id:            0,
			carrier_id:    '668',
			name:          "video_player_3",
			type:          "video_player",
			ip:            "192.168.20.204",
			port:          "8070",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// терминал ввода персонального кода
		{
			id:            0,
			carrier_id:    '865',
			name:          "terminal_1",
			ip:            "192.168.20.180",
			port:          "8070",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "", "code_entered" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал поиска зелёных квадратов
		{
			id:            0,
			carrier_id:    '866',
			name:          "terminal_2",
			ip:            "192.168.20.181",
			port:          "8070",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "game_failed", "game_passed" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал игры светлячок
		{
			id:            0,
			carrier_id:    '867',
			name:          "terminal_3",
			ip:            "192.168.20.183",
			port:          "8070",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "", "game_passed" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал ввода кординат
		{
			id:            0,
			carrier_id:    '868',
			name:          "terminal_4",
			ip:            "192.168.20.182",
			port:          "8070",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "coordinates_entered_fail", "coordinates_entered_true" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// аудиоплеер 1
		{
			id:            0,
			carrier_id:    '768',
			name:          "audio_player_1",
			type:          "audio_player",
			ip:            "192.168.20.193",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// аудиоплеер 2
		{
			id:            0,
			carrier_id:    '767',
			name:          "audio_player_2",
			type:          "audio_player",
			ip:            "192.168.20.192",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// аудиоплеер 3
		{
			id:            0,
			carrier_id:    '766',
			name:          "audio_player_3",
			type:          "audio_player",
			ip:            "192.168.20.191",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},


		// аудиоплеер 4
		{
			id:            0,
			carrier_id:    '765',
			name:          "audio_player_4",
			type:          "audio_player",
			ip:            "192.168.20.190",
			port:          "8070",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
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
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ], 
			states:        [ "off", "on" ],	
		},

	];
}

if (EMULATOR_MODE) {

	// список устройств
	exports.list = [

		// таймер
		{
			id:            127,
			carrier_id:    127,
			name:          "timer",
			ip:            "localhost",
			port:          "3000",
			state:         "idle",
			wd_state:      1,
			wd_enabled:    1,
			value:         5,
			current_value: "",
			commands:      [ "activate" ],
			events:        [ "ready" ]
		},

		// дверь 1
		{
			id:            0,
			carrier_id:    0,
			name:          "door_1",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 2
		{
			id:            0,
			carrier_id:    1,
			name:          "door_2",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 3
		{
			id:            0,
			carrier_id:    2,
			name:          "door_3",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 4
		{
			id:            0,
			carrier_id:    3,
			name:          "door_4",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 5
		{
			id:            0,
			carrier_id:    4,
			name:          "door_5",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 6
		{
			id:            0,
			carrier_id:    5,
			name:          "door_6",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 7
		{
			id:            0,
			carrier_id:    6,
			name:          "door_7",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// дверь 8
		{
			id:            0,
			carrier_id:    7,
			name:          "door_8",
			type:          "door",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
		},

		// подсветка
		{
			id:            0,
			carrier_id:    8,
			name:          "inf_mirror_backlight",
			ip:            "localhost",
			port:          "3000",
			state:         "off",
			value:         "",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			states:        [ "off", "on" ],	
		},

		// многогранник 
		{
			id:            0,
			carrier_id:    9,
			name:          "polyhedron",
			ip:            "localhost",
			port:          "3000",
			state:         "disconnected",
		    wd_state:      1,
			wd_enabled:    1,
			commands:      [ "deactivate", "activate" ],
			events:        [ "disconnected", "activated", "connected" ],
			states:        [ "disconnected", "activated",  "connected"],
		},

		// свет
		{
			id:            0,
			carrier_id:    10,
			name:          "light",
			ip:            "localhost",
			port:          "3000",
			state:         "on",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			events:        [ "off", "on" ],
			states:        [ "off", "on" ],
		},

		// ремни
		{
			id:            0,
			carrier_id:    11,
			name:          "safety_belts",
			ip:            "localhost",
			port:          "3000",
			state:         "number_of_fastened",
			value:         0,
			wd_state:      1,
			wd_enabled:    1,
			events:        [ "number_of_fastened" ],
			states:        [ "number_of_fastened" ],
		},

		// вибрация
		{
			id:            1,
			carrier_id:    11,
			name:          "vibration",
			ip:            "localhost",
			port:          "3000",
			state:         "off",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ],
			events:        [ "off", "on" ],
			states:        [ "off", "on" ],
		},

		// ячейка 1
		{
			id:            0,
			carrier_id:    12,
			name:          "cell_1",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			type:          "cell",
		},

		// ячейка 2
		{
			id:            0,
			carrier_id:    13,
			name:          "cell_2",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			type:          "cell",
		},

		// ячейка 3
		{
			id:            0,
			carrier_id:    14,
			name:          "cell_3",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			type:          "cell",
		},

		// ячейка 4
		{
			id:            0,
			carrier_id:    15,
			name:          "cell_4",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			type:          "cell",
		},

		// ячейка 5
		{
			id:            0,
			carrier_id:    16,
			name:          "cell_5",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			type:          "cell",
		},

		// фигура
		{
			id:            0,
			carrier_id:    17,
			name:          "figure",
			ip:            "localhost",
			port:          "3000",
			state:         "number_of_inserted",
			wd_state:      1,
			wd_enabled:    1,
			value:         0,
			commands:      [ "backlight_off", "backlight_on" ],
			events:        [ "number_of_inserted" ],
			states:        [ "number_of_inserted" ],
		},

		// шкаф с кнопкой и RFID картой
		{
			id:            0,
			carrier_id:    18,
			name:          "locker_2",
			ip:            "localhost",
			port:          "3000",
			state:         "closed",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "close", "open" ],
			states:        [ "closed", "opened" ],	
		},

		// считыватель RFID-карты
		{
			id:            0,
			carrier_id:    19,
			name:          "card_reader",
			ip:            "localhost",
			port:          "3000",
			state:         "not_passed",
			wd_state:      1,
			wd_enabled:    1,
			events:        [ "", "card_ok" ], 
			states:        [ "not_passed", "passed" ],	
		},

		// энергостена
		{
			id:            0,
			carrier_id:    20,
			name:          "power_wall",
			ip:            "localhost",
			port:          "3000",
			state:         "not_passed",
			wd_state:      1,
			wd_enabled:    1,
			events:        [ "", "power_ok" ], 
			states:        [ "not_passed", "passed" ],	
		},

		// видеоплеер 1
		{
			id:            0,
			carrier_id:    'tmpv1',
			name:          "video_player_1",
			type:          "video_player",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// видеоплеер 2
		{
			id:            0,
			carrier_id:    'tmpv2',
			name:          "video_player_2",
			type:          "video_player",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// видеоплеер 3
		{
			id:            0,
			carrier_id:    'tmpv3',
			name:          "video_player_3",
			type:          "video_player",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// терминал ввода персонального кода
		{
			id:            0,
			carrier_id:    'tmpt1',
			name:          "terminal_1",
			ip:            "localhost",
			port:          "3000",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "", "code_entered" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал поиска зелёных квадратов
		{
			id:            0,
			carrier_id:    'tmpt2',
			name:          "terminal_2",
			ip:            "localhost",
			port:          "3000",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "game_failed", "game_passed" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал игры светлячок
		{
			id:            0,
			carrier_id:    'tmpt3',
			name:          "terminal_3",
			ip:            "localhost",
			port:          "3000",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "", "game passed" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// терминал ввода кординат
		{
			id:            0,
			carrier_id:    'tmpt4',
			name:          "terminal_4",
			ip:            "localhost",
			port:          "3000",
			state:         "sleep",
			wd_state:      1,
			wd_enabled:    1,
			value:         "",
			events:        [ "coordinates_entered_fail", "coordinates_entered_true" ],
			commands:      [ "black_screen", "go" ],
			states:        [ "sleep", "active" ],	
		},

		// аудиоплеер 1
		{
			id:            0,
			carrier_id:    'tmpa1',
			name:          "audio_player_1",
			type:          "audio_player",
			ip:            "localhost",
			port:          "3000",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// аудиоплеер 2
		{
			id:            0,
			carrier_id:    'tmpa2',
			name:          "audio_player_2",
			type:          "audio_player",
			ip:            "localhost",
			port:          "3000",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// аудиоплеер 3
		{
			id:            0,
			carrier_id:    'tmpa3',
			name:          "audio_player_3",
			type:          "audio_player",
			ip:            "localhost",
			port:          "3000",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// аудиоплеер 4
		{
			id:            0,
			carrier_id:    'tmpa4',
			name:          "audio_player_4",
			type:          "audio_player",
			ip:            "localhost",
			port:          "3000",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			wd_enabled:    1,
			value:         ""
		},

		// дым машина
		{
			id:            0,
			carrier_id:    21,
			name:          "smoke",
			ip:            "localhost",
			port:          "3000",
			state:         "off",
			wd_state:      1,
			wd_enabled:    1,
			commands:      [ "off", "on" ], 
			states:        [ "off", "on" ],	
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
		value:       'file=mnt/sda/6.mp4&repeat=0',
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
		value:       'file=mnt/sda/7.mp4&repeat=0',
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
];

// время таймера
exports.default_timer_value = '1';
exports.timeouts = {
	T1: 2,
	T2: 2,
	T3: 2,
	T4: 2,
	T5: 2,
}

// watchdog
exports.watchdog_enabled = 0;

// правильные координаты
exports.coordinates = '65732274';