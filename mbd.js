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

	var join_data_hash = {};
	if (query.join) {
		for (var join_table in query.join) {
			join_data_hash[join_table] = load_table(join_table).items_by_id;
		}
		data.items.forEach(function(item){
			for (var join_table in query.join) {
				var join = query.join[join_table];
				item[join.alias]
					= join_data_hash[join_table][item[join.key]];
			}
		});
	}
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
				break;
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

exports.remove = function(table, query, callback) {
	var data = load_table(table);

	var to_remove = [];
	var current_id = 0;
	for (var i = 0; i < data.meta.count; i++) {
		var flag = 1;
		for (var field in query) {
			if (data.items[i][field] != query[field]) {
				flag = 0;
				break;
			}
		}
		if (flag) {
			to_remove.push(i);
		} else {
			if (data.items[i]._id > current_id ) {
				current_id = data.items[i]._id;
			}
		}
	}

	for (var i = 0; i < to_remove.length; i++) {
		var t = data.items[to_remove[i]];
		data.items[to_remove[i]] = data.items[data.meta.count-1-i];
		data.items[data.meta.count-1-i] = t;
	}
	data.items.splice(-1, to_remove.length);
	data.meta.count      -= to_remove.length;
	data.meta.current_id = current_id;

	save_table(table, data.items, data.meta);
	callback(null, null);
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

	var items = jsonfile.readFileSync(file, {throws: false}) || [];
	var items_by_id = {};
	items.forEach(function (item){
		items_by_id[item._id] = item;
	});

	return {
		meta:        jsonfile.readFileSync(meta_file, {throws: false}),
		items:       items,
		items_by_id: items_by_id,
	}
}
function save_table(table, items, meta) {

	var file = 'mbd/' + table + '.json';
	var meta_file = 'mbd/' + table + '.meta.json';

	jsonfile.writeFileSync(file, items);
	jsonfile.writeFileSync(meta_file, meta);
}
