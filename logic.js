var xlsx = require('node-xlsx');
var http   = require('http');

exports.variables_hash = {};
exports.stages_hash    = {};

exports.set_variable = function(name, value) {
	var variable = exports.variables_hash[name];
	if (variable) {
		variable.value = value;
	} else {
		exports.variables_hash[name] = {value: value, name: name, description: 'system' };
	}
}


exports.get_variable = function(name) {
	console.log(name);
	var variable = exports.variables_hash[name];
	if (variable) {
		return variable.value;
	}
	return null;
}

exports.load = function() {
	var obj = xlsx.parse('logic.xlsx');

	// переменные
	var variables = obj[1].data;
	var variable_fields = [
		'no',
		'description',
		'name',
	];

	for (var i = 1; i < variables.length; i++ ){
		var item = {};

		for (var j = 0; j < variable_fields.length; j++) {
			item[variable_fields[j]] = variables[i][j];
		}

		if (item.name) {
			exports.variables_hash[item.name] = {
				description: item.description,
				name:        item.name,
				value:       '',
			};
		}
	}

	// этапы, действия, условия
	var stages = obj[0].data;
	var stage_fields = [
		'stage_no',
		'stage_description',

		'stage_action_type',
		'stage_action_url',
		'stage_action_parameter',
		'stage_action_description',

		'event_type',
		'event_url',
		'event_parameter',
		'event_description',

		'event_condition_value',
		'event_condition_description',

		'event_action_type',
		'event_action_url',
		'event_action_parameter',
	];
	var last_stage = []
	var last_event, last_event_condition;
	for (var i = 2; i < stages.length; i++) {
		var item = {};
		for (var j = 0; j < stage_fields.length; j++) {
			item[stage_fields[j]] = stages[i][j];
		}


		// этап
		if (item.stage_no) {
			last_stage = []
			var stage_nums = parse_stages(item.stage_no.toString())

			stage_nums.forEach(function(stage_num){
				if (exports.stages_hash[stage_num]) {
					last_stage.push(exports.stages_hash[stage_num]);
				} else {
					var new_stage = {
						no:          stage_num,
						description: item.stage_description || '',
						actions:     [],
						events:      [],
					}
					exports.stages_hash[stage_num] = new_stage
					last_stage.push(exports.stages_hash[stage_num])
				}
			})

			// last_stage = {
			// 	no:          item.stage_no,
			// 	description: item.stage_description || '',
			// 	actions:     [],
			// 	events:      [],
			// };

			// exports.stages_hash[item.stage_no] = last_stage;
			//}
		}
		// действия, выполняемые на этапе
		if (item.stage_action_type) {
			var stage_action = {
				description: item.stage_action_description,
				type:        item.stage_action_type,
				url:         item.stage_action_url,
				parameter:   item.stage_action_parameter,
			};
			last_stage.forEach(function(stage){
				stage.actions.push(stage_action)
			})
		}
		// события, обрабатываемые на этапе
		if (item.event_type) {
			last_event = {
				type:        item.event_type,
				url:         item.event_url,
				parameter:   item.event_parameter,
				description: item.event_description,
				conditions:  [],
			};
			last_stage.forEach(function(stage){
				stage.events.push(last_event)
			})
		}
		// условия для события
		if (item.event_condition_value) {
			last_event_condition = {
				description: item.event_action_description,
				value:       item.event_condition_value,
				actions:     [],
			};
			last_event.conditions.push(last_event_condition);
		}
		// действия при выполнении условия
		if (item.event_action_type) {
			var event_condition_action = {
				type:       item.event_action_type,
				url:        item.event_action_url,
				parameter:  item.event_action_parameter,
			};
			last_event_condition.actions.push(event_condition_action);
		}
	}

	// хак - события, выполняемые на каждом этапе
	for (var stage in exports.stages_hash) {
		// // кнопка сбросить
		// exports.stages_hash[stage].events.push({
		// 	type: 'Нажата кнопка',
		// 	url:  '',
		// 	parameter: 'Сбросить',
		// 	conditions: [{
		// 		value: '1',
		// 		actions: [{
		// 			type: 'Переход на этап',
		// 			url:  '',
		// 			parameter: '1',
		// 		}],
		// 	}],
		// });
		// кнопка камера перегружена
		exports.stages_hash[stage].events.push({
			type: 'Нажата кнопка',
			url:  '',
			parameter: 'Камера перегружена',
			conditions: [{
				value: '1',
				actions: [{
					type: 'Команда устройству',
					url:  'audio_player1 play_channel1 :audio1',
					parameter: 'audio1',
				}],
			}],
		});
	} 

}

exports.current_stage = '';

exports.event_interval_object = {};

exports.init = function() {
	exports.switch_stage('1');
}

exports.switch_stage = function(new_stage) {
	//меняем текущий этап
	exports.current_stage = new_stage;
	//меняем поле на экране
	var description = exports.stages_hash[new_stage].description;
	description = exports.parse_variables(description);
	face.field_set_value('quest_state', description);

	// выполянем действия нового этапа
	exports.stages_hash[exports.current_stage].actions.forEach(function(action){
		exports.execute_action(action);
	});

	// ставим ожидание событий
	clearInterval(exports.event_interval_object);
	exports.event_interval_object = setInterval(function(){
		exports.stages_hash[exports.current_stage].events.forEach(function(event_){
			// если событие произошло
			if (event_.happened) {
				event_.conditions.forEach(function(condition){
					var str = condition.value.toString();
					console.log(str);
					console.log(event_.parameter);
					console.log(event_.value);
					if (event_.parameter && event_.value && event_.parameter != '0') {
						var re  = new RegExp(event_.parameter, "g");
						str = str.replace(re, event_.value.toString());
					}
					console.log(str);
					str = exports.parse_variables(str);
					console.log(str);
					var result = eval(str);
					console.log(result);
					// если условие истинно, выполняем его действия
					if (result) {

						//clearInterval(exports.event_interval_object);
						event_.happened = 0;
						condition.actions.forEach(function(action){
							exports.execute_action(action);
						})
					}
				})
			}
		})
	},
	50 );
}

exports.parse_variables = function(src) {

	var dst = src;
	for (var variable in exports.variables_hash) {
		console.log(exports.variables_hash[variable]);
		var re = new RegExp(exports.variables_hash[variable].name, "g");
		dst = dst.replace(re, exports.variables_hash[variable].value);
	}
	return dst;
}

exports.execute_action = function(action) {
	dev_log('execute_action')
	dev_log(action)
	switch(action.type) {
		case 'Внутренняя команда':
			var query = globals.get('web_server_url') + '/game/' + action.parameter;
			http.get(query, function(res) {
					res.on('error', function(data){
					});
				}).on('error', function(e) {
					simple_log(query + " error");
			});
			break;

		case 'Команда устройству':
			var args = action.url.split(" ");
			queue.push(args[0], args[1], args[2]);
			break;

		case 'Переход на этап':
			exports.switch_stage(action.parameter);
			break;

		case 'Инициализировать таймер':
			mtimers.start(action.url, action.parameter);
			break;

		case 'Активировать кнопку':
			face.button_enable(action.parameter);
			break;

		case 'Деактивировать кнопку':
			face.button_disable(action.parameter);
			break;

		case 'Остановить таймер':
			mtimers.stop(action.url, action.parameter);
			break;
	}
}

exports.submit_event = function (event_type, url, value) {
dev_log(event_type);
dev_log(url);
	switch(event_type) {
		case 'Внутреннее событие':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.parameter == url) {
					event_.happened = 1;
				}
			});
			break;	
		case 'Таймер готов':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.url == url) {
					event_.happened = 1;
				}
			});
			break;	

		case 'Нажата кнопка':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.parameter == url) {
					event_.happened = 1;
				}
			});
			break;

		case 'Рапорт устройства':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.url == url) {
					event_.happened = 1;
					event_.value = value;
				}
			});
			break;

	}
}

function parse_stages(stages_str) {
	var stages = []
	var intervals = stages_str.split(',')
	intervals.forEach(function(interval){
		var bounds = interval.split('-')
		if (bounds.length == 1) {
			stages.push(bounds[0])
		} else if (bounds.length == 2) {
			var left = parseInt(bounds[0])
			var right = parseInt(bounds[1])
			for (var i = left; i <= right; i++){
				stages.push(i.toString())
			}
		}
	})
	return stages
}