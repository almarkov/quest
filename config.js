// адрес МК - может  быть несколько

// надо прописать для каждого
// надо сделать,	чтобы адрес устройства вычисляся так:
// url = "http://<ip>:<port>" || "<url>",	т.е. можно указать либо ip+port,	либо url
exports.dev_url = "http://localhost:3000";

// список устройств
exports.list = [

	// таймер
	{
		id:            1,
		arduino_id:    1,
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

	// входная дверь
	{
		id:            2,
		arduino_id:    1,
		name:          "entrance_door",
		ip:            "localhost",
		port:          "3000",
		state:         "opened",
		wd_state:      1,
		commands:      [ "close", "open"]
	},

	// дверь в комнату №2
	{
		id:            3,
		arduino_id:    1,
		name:          "room2_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
	},

	// кнопка,	открывающая шкаф
	{
		id:            4,
		arduino_id:    1,
		name:          "locker_button",
		ip:            "localhost",
		port:          "3000",
		state:         "idle",
		wd_state:      1,
		commands:      [ "push" ],
		events:        [ "pushed" ]
	},

	// дверь шкафа
	{
		id:            5,
		arduino_id:    1,
		name:          "locker_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
	    wd_state:      1,
		commands:      [ "close", "open" ]
	},

	// подставка многогранника 
	{
		id:            6,
		arduino_id:    1,
		name:          "polyhedron_rack",
		ip:            "localhost",
		port:          "3000",
		state:         "idle",
	    wd_state:      1,
		commands:      [ "deactivate", "activate" ],
		events:        [ "activated" ]
	},

	// свет
	{
		id:            7,
		arduino_id:    1,
		name:          "light",
		ip:            "localhost",
		port:          "3000",
		state:         "on",
		wd_state:      1,
		commands:      ["turn_off", "turn_on" ]
	},

	// дверь в комнату №3
	{
		id:            8,
		arduino_id:    1,
		name:          "room3_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
	},

	// дверь в комнату №4
	{
		id:            9,
		arduino_id:    1,
		name:          "room4_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
	},

	// дверь в комнату №5
	{
		id:            10,
		arduino_id:    1,
		name:          "room5_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
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

	// дверь в комнату №6
	{
		id:            12,
		arduino_id:    1,
		name:          "room6_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
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

	// дверь в комнату №7
	{
		id:            15,
		arduino_id:    1,
		name:          "room7_door",
		ip:            "localhost",
		port:          "3000",
		state:         "closed",
		wd_state:      1,
		commands:      [ "close", "open" ]
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

// время таймера
exports.default_timer_value = '3';

// watchdog
exports.watchdog_enabled = 0;