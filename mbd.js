var jsonfile = require('jsonfile');
var util = require('util');


// каждая таблица aztecs - 2 файла
//     aztecs.js - json с записями
//     aztecs.meta.js - json с инфой таблицы
//         current_id - текущий id, подумать sequence или hash или комбинация
//         count      - счётчик записей


// API
exports.select = function(table, query, callback) {

	var data = load_table(table);

	callback(null, data.items);

}

exports.insert = function(table, item, params, callback) {

	var data = load_table(table);

	item._id = data.meta.current_id+1;

	data.items.push(item);
	var meta = {
		current_id: item._id,
		count:      data.items.length,
	};

	save_table(table, data.items, meta);

	callback(null, item);
		
}

exports.findById = function(table, id, callback) {

	var data = load_table(table);

	var result = {};

	for (var i = 0; i < data.meta.count; i++) {
		if (data.items[i]._id == id) {
			result = data.items[i];
			break;
		}
	}
	callback(null, result);

}

exports.findAndUpdate = function(table, query, params, callback) {

	var data = load_table(table);

	for (var i = 0; i < data.meta.count; i++) {
		var flag = 1;
		for (var field in query) {
			if (data.items[i][field] != query[field]) {
				flag = 0;
			}
		}
		if (flag) {
			for (var field in params) {
				data.items[i][field] = params[field];
			}
		}
	}
	save_table(table, data.items, data.meta);
	callback(null, null);

}

exports.delete = function(table, params) {

}


// Implementation
function load_table(table) {

	var file = 'mbd/' + table + '.json';
	var meta_file = 'mbd/' + table + '.meta.json';
	var meta = jsonfile.readFileSync(meta_file, {throws: false});
	if (meta === null) {
		jsonfile.writeFileSync(meta_file, {
			count:      0,
			current_id: 0,
		});
	}

	return {
		meta:  jsonfile.readFileSync(meta_file, {throws: false}),
		items: jsonfile.readFileSync(file, {throws: false}) || [],
	}
}
function save_table(table, items, meta) {

	var file = 'mbd/' + table + '.json';
	var meta_file = 'mbd/' + table + '.meta.json';

	jsonfile.writeFileSync(file, items);
	jsonfile.writeFileSync(meta_file, meta);
}
