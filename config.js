// адрес МК - может  быть несколько

// надо прописать для каждого
// надо сделать,	чтобы адрес устройства вычисляся так:
// url = "http://<ip>:<port>" || "<url>",	т.е. можно указать либо ip+port,	либо url
exports.dev_url = "http://localhost:3000";

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

// список устройств
exports.list = [

	// таймер
	{
		id:            127,
		arduino_id:    127,
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
		id:            1,
		arduino_id:    1,
		name:          "door_1",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 2
	{
		id:            2,
		arduino_id:    1,
		name:          "door_2",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 3
	{
		id:            3,
		arduino_id:    1,
		name:          "door_3",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 4
	{
		id:            4,
		arduino_id:    1,
		name:          "door_4",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 5
	{
		id:            5,
		arduino_id:    1,
		name:          "door_5",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 6
	{
		id:            6,
		arduino_id:    1,
		name:          "door_6",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 7
	{
		id:            7,
		arduino_id:    1,
		name:          "door_7",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// дверь 8
	{
		id:            8,
		arduino_id:    1,
		name:          "door_8",
		type:          "door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
	},

	// аудиоплеер 1
	{
		id:            9,
		arduino_id:    1,
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
		id:            10,
		arduino_id:    1,
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
		id:            11,
		arduino_id:    1,
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
		id:            12,
		arduino_id:    1,
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
		id:            13,
		arduino_id:    1,
		name:          "audio_player_5",
		type:          "audio_player",
		ip:            "localhost",
		port:          "3000",
		state:         "ch1_stop_ch2_stop",
		wd_state:      1,
		value:         ""
	},

	// видеоплеер 1
	{
		id:            14,
		arduino_id:    1,
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
		id:            15,
		arduino_id:    1,
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
		id:            16,
		arduino_id:    1,
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
		id:            17,
		arduino_id:    1,
		name:          "video_player_4",
		type:          "video_player",
		ip:            "localhost",
		port:          "3000",
		state:         "stopped",
		wd_state:      1,
		value:         ""
	},

	// кнопка,	открывающая шкаф
	{
		id:            18,
		arduino_id:    1,
		name:          "locker_1_button",
		ip:            "localhost",
		port:          "3000",
		state:         "not_pushed",
		wd_state:      1,
		events:        [ "pushed" ],
		states:        [ "not_pushed", "pushed" ],
	},

	// дверь шкафа
	{
		id:            19,
		arduino_id:    1,
		name:          "locker_1",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
	    wd_state:      1,
		commands:      [ "close", "open" ],
		states:        [ "closed", "opened" ],
	},

	// многогранник 
	{
		id:            20,
		arduino_id:    1,
		name:          "polyhedron",
		ip:            "localhost",
		port:          "3000",
		state:         "deactivated",
	    wd_state:      1,
		commands:      [ "deactivate", "activate" ],
		events:        [ "deactivated", "activated" ]
	},

	// свет
	{
		id:            21,
		arduino_id:    1,
		name:          "light",
		ip:            "localhost",
		port:          "3000",
		state:         "on",
		wd_state:      1,
		commands:      [ "off", "on" ],
		events:        [ "off", "on" ],
	},

	// ремни
	{
		id:            22,
		arduino_id:    1,
		name:          "safety_belts",
		ip:            "localhost",
		port:          "3000",
		state:         "number_of_fastened",
		value:         0,
		wd_state:      1,
		events:        [ "number_of_fastened" ],
	},

	// вибрация
	{
		id:            23,
		arduino_id:    1,
		name:          "vibration",
		ip:            "localhost",
		port:          "3000",
		state:         "off",
		wd_state:      1,
		commands:      [ "off", "on" ],
		events:        [ "off", "on" ],
	},

	// кнопка спасения игрока
	{
		id:            11,
		arduino_id:    1,
		name:          "save_button",
		ip:            "localhost",
		port:          "3000",
		state:         "idle",
		wd_state:      1,
		commands:      [ "close", "open" ],
		events:        [ "pushed" ]
	},

	// ячейка №1
	{
		id:            13,
		arduino_id:    1,
		name:          "cell1",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ],
		events:        [ "code_entered" ],
	},

	// ячейка №2
	{
		id:            14,
		arduino_id:    1,
		name:          "cell2",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ],
		events:        [ "code_entered" ],
	},

	// планшет
	{
		id:            16,
		arduino_id:    1,
		name:          "personal_code_pad",
		ip:            "localhost",
		port:          "3000",
		state:         "idle",
		wd_state:      1,
		commands:      [ "deactivate", "activate" ]
	},

	// экран1
	{
		id:            17,
		arduino_id:    1,
		name:          "screen1",
		ip:            "localhost",
		port:          "3000",
		state:         "stop",
		wd_state:      1,
		commands:      [ "play" ],
		events:        [ "stopped" ]
	},

	// экран2
	{
		id:            18,
		arduino_id:    1,
		name:          "screen2",
		ip:            "localhost",
		port:          "3000",
		state:         "stop",
		wd_state:      1,
		commands:      [ "play" ],
		events:        [ "stopped" ]
	},

	// кресла
	{
		id:            19,
		arduino_id:    1,
		name:          "chairs",
		ip:            "localhost",
		port:          "3000",
		state:         "not_fasten",
		wd_state:      1,
		commands:      [ "stop_vibrate", "vibrate" ],
		events:        [ "fasten"]
	},

	// аудиоконтроллер
	{
		id:            20,
		arduino_id:    1,
		name:          "audio_controller",
		ip:            "localhost",
		port:          "3000",
		state:         "stop",
		wd_state:      1,
		commands:      [ "play" ],
		events:        [ "stopped" ]
	},

];


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
];

// для реальных файлов
// exports.files = [
// 	'file=\/storage\/emulated\/0\/Audio\/20.mp3\&repeat=1',
// 	'file=\/storage\/emulated\/0\/Video\/12.mp4\&repeat=0',
// 	'file=\/storage\/emulated\/0\/Video\/2.mp4\&repeat=0',
// 	'file=\/storage\/emulated\/0\/Video\/3.mp4\&repeat=1',
//  'file=\/storage\/emulated\/0\/Audio\/2.mp3\&repeat=0',
//  'file=\/storage\/emulated\/0\/Video\/4.mp4\&repeat=0',
//  'file=\/storage\/emulated\/0\/Audio\/3.mp3\&repeat=0',
//  'file=/storage/emulated/0/Video/5.mp4&repeat=0',
//  'file=/storage/emulated/0/Audio/4.mp3&repeat=0',
// 	'audio5',
// 	'video1',
// 	'video2',
// 	'video3'
// ];

// время таймера
exports.default_timer_value = '3';

// watchdog
exports.watchdog_enabled = 0;