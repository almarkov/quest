var xlsx = require('node-xlsx');

// адрес web-сервера
exports.web_server_url = "http://localhost:3000";

// confirm для кнопок
exports.enable_buttons_confirm = 0;

// период wd в мс
exports.wd_timer = 1000;

// wd число возможных неответов
exports.wd_limit = 3;

// wd_timer*wd_limit/1000 = количество секунд, через которые 
// контроллер считается неответившим

exports.list = [];

exports.load = function() {
	var obj = xlsx.parse('config.xlsx');
	var data = obj[0].data;

	var fields = [
		'no',            // №
		'title',         // "Название устройства в веб-интерфейсе"
		'name',          // "Название устройства в коде"
		'ip',            // "IP"
		'port',          // "Port"
		'carrier_id',    // "Carrier ID"
		'id',            // "Onboard ID"
		'wd',            // "WD"
		'position',      // "расположение"
		'has_value',     // "есть значение для ввода"
		'command_code',  // "ID команды"
		'command_name',  //     "Название команды"
		'command_title', //     "Название командыв веб-интерфейсе"
		'command_param', //     "Параметр команды"
		'event_code',    // "ID рапорта"
		'event_name',    //     "Название рапорта"
		'event_title',   //     "Название рапорта в веб-интерфейсе"
		'event_param',   //     "Параметр рапорта"
		'state_code',    // "ID состояния"
		'state_name',    //     "Название состояния в коде"
		'state_title',   //     "Название состояния в веб-интерфейсе"
	];

	var start_line = 3;// пропускаем заголовки
	for (var i = start_line; i < data.length; i++) {
		var line = data[i];

		var item  = {};
		var last_item;
		for (var j = 0; j < fields.length; j++) {
			if (fields[j].match(/name/) && line[j] ) {
				item[fields[j]] = line[j].replace(' ', '_').toLowerCase();
			} else {
				item[fields[j]] = line[j];
			}
		}
		if (item.no) {
			last_item = {
				id:         item.id,
				carrier_id: item.carrier_id,
				name:       item.name,
				title:      item.title,
				ip:         item.ip || 'localhost',
				port:       item.port || 3000,
				state:      'undef',
				wd_state:   exports.wd_limit,
				sv_port:    0,
				position:   {
					column: item.position,
				},
				value:      '',
				commands:   {},
				events:     {},
				states:     {
					undef: {
						code:  -1,
						name:  'undef',
						title: 'не определён'
					},
				},
				has_value:  item.has_value && item.has_value == 1 ? 1 : 0,
			};
			switch (item.wd){
				case 2:
					last_item.wd_emulate = 1;
					last_item.wd_enabled = 1;
					break;
				case 1:
					last_item.wd_emulate = 0;
					last_item.wd_enabled = 1;
					break;
				case 0:
				default:
					last_item.wd_emulate = 0;
					last_item.wd_enabled = 0;
					break;

			}
			exports.list.push(last_item);
		}
		if (typeof item.command_code !== 'undefined') {
			last_item.commands[item.command_name] = {
				code:   item.command_code,
				name:   item.command_name,
				title:   item.command_name,
			};
			if (item.command_title) {
				last_item.commands[item.command_name].title = item.command_title;
				last_item.commands[item.command_name].has_button = 1;
				last_item.commands[item.command_name].button = {
					confirm: exports.enable_buttons_confirm,
				};
			}
		}
		if (typeof item.event_code !== 'undefined') {
			last_item.events[item.event_name] = {
				code:   item.event_code,
				name:   item.event_name,
			};
			if (item.event_title) {
				last_item.events[item.event_name].title = item.event_title;
				last_item.events[item.event_name].has_button = 1;
				var params;
				if (item.event_param) {
					params = item.event_param.split(',');
				}
				last_item.events[item.event_name].button = {
					confirm:   exports.enable_buttons_confirm,
					parameter: item.event_param ? params[1] : undefined, 
				};
			}
		}
		if (typeof item.state_code !== 'undefined') {
			last_item.states[item.state_name] = {
				code:   item.state_code,
				name:   item.state_name,
				title:  item.state_title,
			};
		}
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
	B:  5,
	C:  8,
	D:  5,
	E:  3,
	CHECK_TIME: 5,
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