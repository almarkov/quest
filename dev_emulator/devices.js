//---------------------------------------------------------
// состояния устройств в текущий момент
//---------------------------------------------------------

var config = require("./config.js");

var simple_copy_obj = function(obj) {
	var new_obj = {};
	for (var k in obj) {
		new_obj[k] = obj[k];
	}
	return new_obj;
}

// входная дверь
exports._entrance_door   = simple_copy_obj(config._entrance_door);
// таймер
exports._timer           = simple_copy_obj(config._timer);
// дверь в комнату №2
exports._room2_door      = simple_copy_obj(config._room2_door);
// кнопка, открывающая шкаф
exports._locker_button   = simple_copy_obj(config._locker_button);
// дверь шкафа
exports._locker_door     = simple_copy_obj(config._locker_door);
// подставка многогранника 
exports._polyhedron_rack = simple_copy_obj(config._polyhedron_rack);
// свет
exports._light           = simple_copy_obj(config._light);
// дверь в комнату №3
exports._room3_door      = simple_copy_obj(config._room3_door);
// дверь в комнату №4
exports._room4_door      = simple_copy_obj(config._room4_door);
// дверь в комнату №5
exports._room5_door      = simple_copy_obj(config._room5_door);
// кнопка спасения игрока
exports._save_button     = simple_copy_obj(config._save_button);
// дверь в комнату №6
exports._room6_door      = simple_copy_obj(config._room6_door);
// ячейка №1
exports._cell1           = simple_copy_obj(config._cell1);
// ячейка №2
exports._cell2           = simple_copy_obj(config._cell2);
// дверь в комнату №7
exports._room7_door      = simple_copy_obj(config._room7_door);

// сброс значений до конфига
exports.reset = function() {
	exports._entrance_door   = simple_copy_obj( config._entrance_door);
	exports._timer           = simple_copy_obj( config._timer);
	exports._room2_door      = simple_copy_obj( config._room2_door);
	exports._locker_button   = simple_copy_obj( config._locker_button);
	exports._locker_door     = simple_copy_obj( config._locker_door);
	exports._polyhedron_rack = simple_copy_obj( config._polyhedron_rack);
	exports._light           = simple_copy_obj(config._light);
	exports._room3_door      = simple_copy_obj(config._room3_door);
	exports._room4_door      = simple_copy_obj(config._room4_door);
	exports._room5_door      = simple_copy_obj(config._room5_door);
	exports._save_button     = simple_copy_obj(config._save_button);
	exports._room6_door      = simple_copy_obj(config._room6_door);
	exports._cell1           = simple_copy_obj(config._cell1);
	exports._cell2           = simple_copy_obj(config._cell2);
	exports._room7_door      = simple_copy_obj(config._room7_door);
}