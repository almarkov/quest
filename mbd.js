var jsonfile = require('jsonfile');
var util = require('util');


// каждая таблица aztecs - 2 файла
//     aztecs.js - json с записями
//     aztecs.meta.js - json с инфой таблицы
//         current_id - счётчик записей, подумать sequence или hash или комбинация
//         ?


// API
exports.select = function(table, params, callback) {
	dev_log('select');dev_log(table);
	var file = 'mbd/' +   + '.json';
	var obj = {name: 'JP'};

	jsonfile.writeFile(file, obj, function (err) {
	  dev_log(err);
	});
	jsonfile.readFileSync(file, function(err, obj) {
		dev_log('select?');
		if (err) {

			dev_log('select ' + + ' error' );
			dev_log(err);
		//	callback();
			return;
		}
		//callback();
	});
}

exports.insert_into = function(table, item) {

}

exports.delete = function(table, params) {

}


// Implementation