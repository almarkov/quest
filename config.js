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
		events:   [ "ch1_playback_finished", "ch2_playback_finished" ],
		states:   [ "ch1_stop_ch2_stop", "ch1_play_ch2_stop", "ch1_stop_ch2_play", "ch1_play_ch2_play" ]
	},
	video_player: {
		commands: [ "stop", "play" ],
		events:   [ "playback_finished" ],
		states:   [ "stopped", "playing" ]
	},
	cell: {
		commands: [ "close", "open" ],
		events:   [ "code_entered"],
		states:   [ "closed", "opened"],
	}
};
if (REAL_MODE) {

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
			commands:      [ "off", "on" ],
			states:        [ "off", "on" ],	
		},

		// // кнопка,	открывающая шкаф
		// {
		// 	id:            18,
		// 	carrier_id:    1,
		// 	name:          "locker_1_button",
		// 	ip:            "localhost",
		// 	port:          "3000",
		// 	state:         "not_pushed",
		// 	wd_state:      1,
		// 	events:        [ "pushed" ],
		// 	states:        [ "not_pushed", "pushed" ],
		// },

		// // дверь шкафа
		// {
		// 	id:            19,
		// 	carrier_id:    1,
		// 	name:          "locker_1",
		// 	ip:            "localhost",
		// 	port:          "3000",
		// 	state:         "closed",
		//     wd_state:      1,
		// 	commands:      [ "close", "open" ],
		// 	states:        [ "closed", "opened" ],
		// },

		// многогранник 
		{
			id:            0,
			carrier_id:    9,
			name:          "polyhedron",
			ip:            "localhost",
			port:          "3000",
			state:         "disconnected",
		    wd_state:      1,
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
			value:         0,
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
			commands:      [ "close", "open" ],
			states:        [ "closed", "opened" ],	
		},

		// RFID карта
		{
			id:            1,
			carrier_id:    18,
			name:          "card_holder",
			ip:            "localhost",
			port:          "3000",
			state:         "not_given",
			wd_state:      1,
			commands:      [ "not_given", "given" ], 
			events:        [ "not_given", "given" ], 
			states:        [ "not_given", "given" ],	
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
			events:        [ "card_ok", "given" ], 
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
			events:        [ "power_ok" ], 
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
			value:         ""
		},

		// видеоплеер 4
		{
			id:            0,
			carrier_id:    'tmpv4',
			name:          "video_player_4",
			type:          "video_player",
			ip:            "localhost",
			port:          "3000",
			state:         "stopped",
			wd_state:      1,
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
			value:         "",
			events:        [ "code_entered" ],
			commands:      [ "deactivate", "activate"],
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
			value:         "",
			events:        [ "game_not_passed", "game_passed" ],
			commands:      [ "deactivate", "activate"],
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
			value:         "",
			events:        [ "game passed" ],
			commands:      [ "deactivate", "activate"],
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
			value:         "",
			events:        [ "coordinates_entered" ],
			commands:      [ "deactivate", "activate"],
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
			value:         ""
		},

		// аудиоплеер 5
		{
			id:            0,
			carrier_id:    'tmpa5',
			name:          "audio_player_5",
			type:          "audio_player",
			ip:            "localhost",
			port:          "3000",
			state:         "ch1_stop_ch2_stop",
			wd_state:      1,
			value:         ""
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
	'blue',
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



// для реальных файлов
// exports.files = [
// 	'file=\/storage\/emulated\/0\/Audio\/20.mp3\&repeat=1',//0
// 	'file=\/storage\/emulated\/0\/Video\/12.mp4\&repeat=0',
// 	'file=\/storage\/emulated\/0\/Video\/2.mp4\&repeat=0',
// 	'file=\/storage\/emulated\/0\/Video\/3.mp4\&repeat=1',
//  'file=\/storage\/emulated\/0\/Audio\/2.mp3\&repeat=0',
//  'file=\/storage\/emulated\/0\/Video\/4.mp4\&repeat=0',
//  'file=\/storage\/emulated\/0\/Audio\/3.mp3\&repeat=0',
//  'file=/storage/emulated/0/Video/5.mp4&repeat=0',
//  'file=/storage/emulated/0/Audio/4.mp3&repeat=0',
//  'file=/storage/emulated/0/Video/6.mp4&repeat=0',
//  'file=/storage/emulated/0/Audio/6.mp3&repeat=0',//10
//  'file=/storage/emulated/0/Audio/7.mp3&repeat=0',
//  'file=/storage/emulated/0/Audio/8.mp3&repeat=0',
//  'file=/storage/emulated/0/Audio/9.mp3&repeat=0',
//  'file=/storage/emulated/0/Audio/10.mp3&repeat=0',
//  'file=/storage/emulated/0/Audio/11.mp3&repeat=0',
//  'file=/storage/emulated/0/Audio/12.mp3&repeat=0',
//  'file=/storage/emulated/0/Video/8.mp4&repeat=0',
//  'file=/storage/emulated/0/Video/9.mp4&repeat=0',
//  'file=/storage/emulated/0/Video/10.mp4&repeat=0',
//  'file=/storage/emulated/0/Audio/13.mp3&repeat=0',//20
//  'file=/storage/emulated/0/Video/11.mp4&repeat=0',
//  'file=/storage/emulated/0/Video/12.mp4&repeat=0',
//  'file=/storage/emulated/0/Video/1.mp4&repeat=1',
//  'file=/storage/emulated/0/Audio/21.mp3&repeat=0',
// 	'audio5',
// 	'video1',
// 	'video2',
// 	'video3'
// ];

// файлы игроков
// exports.player_files =[
// 	"file=/storage/emulated/0/Audio/1.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/2.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/3.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/4.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/5.mp3&repeat=0",
// ];

// файлы цветов
// exports.color_files =[
// 	"file=/storage/emulated/0/Audio/1.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/2.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/3.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/4.mp3&repeat=0",
// 	"file=/storage/emulated/0/Audio/5.mp3&repeat=0",
// ];



// время таймера
exports.default_timer_value = '3';

// watchdog
exports.watchdog_enabled = 0;

// правильные координаты
exports.coordinates = '666';