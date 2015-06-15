// адрес МК - может  быть несколько

// надо прописать для каждого
// надо сделать, чтобы адрес устройства вычисляся так:
// url = "http://<ip>:<port>" || "<url>", т.е. можно указать либо ip+port, либо url
exports.dev_url = "http://localhost:3000";

// список устройств
exports.list = [
	// таймер
 	{id:  1, arduino_id: 1, name: "timer",             url: web_server_url,  ip: "localhost", port: "3000", state: "idle", value: 5, current_value: "" }, // events: ready
	// входная дверь
	{id:  2, arduino_id: 1, name: "entrance_door",     url: exports.dev_url, ip: "localhost", port: "3000", state: "opened"}, // events:, actions: open|close|state
	// дверь в комнату №2
	{id:  3, arduino_id: 1, name: "room2_door",        url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// кнопка, открывающая шкаф
	{id:  4, arduino_id: 1, name: "locker_button",     url: exports.dev_url, ip: "localhost", port: "3000", state: "idle"},  // events: pushed
	// дверь шкафа
	{id:  5, arduino_id: 1, name: "locker_door",       url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// подставка многогранника 
	{id:  6, arduino_id: 1, name: "polyhedron_rack",   url: exports.dev_url, ip: "localhost", port: "3000", state: "idle"}, // events: activated
	// свет
	{id:  7, arduino_id: 1, name: "light",             url: exports.dev_url, ip: "localhost", port: "3000", state: "on"},   // passive
	// дверь в комнату №3
	{id:  8, arduino_id: 1, name: "room3_door",        url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// дверь в комнату №4
	{id:  9, arduino_id: 1, name: "room4_door",        url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// дверь в комнату №5
	{id: 10, arduino_id: 1, name: "room5_door",        url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// кнопка спасения игрока
	{id: 11, arduino_id: 1, name: "save_button",       url: exports.dev_url, ip: "localhost", port: "3000", state: "idle"},  // events: pushed
	// дверь в комнату №6
	 {id: 12, arduino_id: 1, name: "room6_door",       url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// ячейка №1
	 {id: 13, arduino_id: 1, name: "cell1",            url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // events: code_entered
	// ячейка №2
	{id: 14, arduino_id: 1, name: "cell2",             url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // events: code_entered
	// дверь в комнату №7
	{id: 15, arduino_id: 1, name: "room7_door",        url: exports.dev_url, ip: "localhost", port: "3000", state: "closed"}, // passive
	// планшет
	{id: 16, arduino_id: 1, name: "personal_code_pad", url: exports.dev_url, ip: "localhost", port: "3000", state: "idle"},  // events: code_entered
	// экран1
	{id: 17, arduino_id: 1, name: "screen1",           url: exports.dev_url, ip: "localhost", port: "3000", state: "stop"},  // passive
	// экран2
	{id: 18, arduino_id: 1, name: "screen2",           url: exports.dev_url, ip: "localhost", port: "3000", state: "stop"},  // passive
	// кресла
	{id: 19, arduino_id: 1, name: "chairs",            url: exports.dev_url, ip: "localhost", port: "3000", state: "not_fasten"},  // passive
	// аудиоконтроллер
	{id: 20, arduino_id: 1, name: "audio_controller",  url: exports.dev_url, ip: "localhost", port: "3000", state: "stop"},  // passive
];



// список команд
exports.actions_list = [
	"open",          // 0
	"close", 
	"opened",
	"closed",
	"pushed",
	"activated",     // 5
	"turn_on",
	"turn_off",
	"turned_on",
	"turned_off",
	"fasten",        // 10
	"play",
	"stop",
	"stopped",
	"stop_vibrate",
	"vibrate",       // 15

];

exports.get_command_id = function(command){
	for (var i = 0; i < exports.actions_list.length; i++) {
		if (command == exports.actions_list[i]) {
			return i;
		}
	}
};


// время таймера
exports.default_timer_value = '3';
