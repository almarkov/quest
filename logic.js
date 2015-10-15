var xlsx = require('node-xlsx');

exports.variables_hash = {};
exports.stages_hash    = {};

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

		exports.variables_hash[item.name] = {
			description: item.description,
			name:        item.name,
			value:       '3',
		};
	}

	// этапы, действия, условия
	var stages = obj[0].data;
	var stage_fields = [
		'stage_no',
		'stage_description',

		'stage_action_type',
		'stage_action_arg',
		'stage_action_description',

		'event_type',
		'event_arg',
		'event_description',

		'event_condition_value',
		'event_condition_description',

		'event_action_type',
		'event_action_arg',
	];

	for (var i = 2; i < stages.length; i++) {
		var item = {};
		for (var j = 0; j < stage_fields.length; j++) {
			item[stage_fields[j]] = stages[i][j];
		}

		var last_stage, last_event, last_event_condition;
		// этап
		if (item.stage_no) {
			last_stage = {
				no:          item.stage_no,
				description: item.stage_description,
				actions:     [],
				events:      [],
			};

			exports.stages_hash[item.stage_no] = last_stage;
		}
		// действия, выполняемые на этапе
		if (item.stage_action_type) {
			var stage_action = {
				description: item.stage_action_description,
				type:        item.stage_action_type,
				arg:         item.stage_action_arg,
			};
			last_stage.actions.push(stage_action);
		}
		// события, обрабатываемые на этапе
		if (item.event_type) {
			last_event = {
				type:        item.event_type,
				arg:         item.event_arg.split("\/"),
				description: item.event_description,
				conditions:  [],
			};
			last_stage.events.push(last_event);
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
		if (item.event_condition_value) {
			var event_condition_action = {
				type: item.event_action_type,
				arg:  item.event_action_arg,
			};
			last_event_condition.actions.push(event_condition_action);
		}
	}

}

exports.current_stage = '';

exports.event_interval_object = {};

exports.init = function() {
	dev_log('init');
	exports.switch_stage('10');
}

exports.switch_stage = function(new_stage) {
	dev_log('switch_stage');
	dev_log(new_stage);
	//меняем текущий этап
	exports.current_stage = new_stage;

	// выполянем действия нового этапа
	exports.stages_hash[exports.current_stage].actions.forEach(function(action){
		exports.execute_action(action);
	});

	// ставим ожидание событий
	clearInterval(exports.event_interval_object);
	dev_log('switch_stage2');
	exports.event_interval_object = setInterval(function(){
		dev_log('setInterval');
		dev_log(exports.current_stage);
		exports.stages_hash[exports.current_stage].events.forEach(function(event_){
			dev_log('cycek');
			// если событие произошло
			dev_log(event_);
			if (event_.happened) {
				dev_log('happened');
				event_.conditions.forEach(function(condition){
					var str = condition.value.toString();
					if (event_.arg[2] && event_.arg[2] != '0') {
						var re  = new RegExp(event_.arg[2], "g");
						str = str.replace(re, event_.value);
					}
					str = exports.parse_variables(str);
					var result = eval(str);
					// если условие истинно, выполняем его дествия
					if (result) {
						dev_log(condition);
						clearInterval(exports.event_interval_object);
						event_.happened = 0;
						condition.actions.forEach(function(action){
							exports.execute_action(action);
						})
					}
				})
				// выключаем ожидание
				event_.happened = 0;
			}
		})
	},
	50 );
}

exports.parse_variables = function(src) {
	dev_log('parse_variables');
	dev_log(src);
	var dst = src;
	for (var variable in exports.variables_hash) {
		var re = new RegExp(exports.variables_hash[variable].name, "g");
		dst = dst.replace(re, exports.variables_hash[variable].value);
	}
	return dst;
}

exports.execute_action = function(action) {
	dev_log('execute_action');
	dev_log(action);
	switch(action.type) {
		case 'Команда устройству':
			var args = action.arg.split("\/");
			queue.push(args[0], args[1], args[2], DISABLE_TIMER);
			break;

		case 'Переход на этап':
			exports.switch_stage(action.arg);
			break;

		case 'Инициализировать таймер':
			break;
	}
}

exports.submit_event = function (event_type, arg, value) {
	dev_log('submit_event');
	dev_log(event_type);
	dev_log(arg);
	dev_log(value);
	switch(event_type) {
		case 'Нажата кнопка':
			dev_log(exports.stages_hash[exports.current_stage]);
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				dev_log(event_);
				dev_log(event_.arg[0]);
				if (event_.arg[0] == arg) {
					event_.happened = 1;
					dev_log('new_event');
					dev_log(event_);
				}
			});
			break;

		case 'Рапорт устройства':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.arg[0] == arg) {
					event_.happened = 1;
					event_.value = value
				}
			});
			break;

	}
}