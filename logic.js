var xlsx = require('node-xlsx');
var http   = require('http');

exports.variables_hash = {};
exports.stages_hash    = {};

exports.set_variable = function(name, value) {
	exports.variables_hash[name].value = value;
}


exports.get_variable = function(name) {
	return exports.variables_hash[name].value;
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

		exports.variables_hash[item.name] = {
			description: item.description,
			name:        item.name,
			value:       '',
		};
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
				url:         item.stage_action_url,
				parameter:   item.stage_action_parameter,
			};
			last_stage.actions.push(stage_action);
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
		var action = {
			type: 'Переход на этап',
			url:  '',
			parameter: '1',
		};
		var condition = {
			value: '1',
			actions: [action]
		}
		exports.stages_hash[stage].events.push({
			type: 'Нажата кнопка',
			url:  '',
			parameter: 'Сбросить',
			conditions: [condition],
		});
	} 

}

exports.current_stage = '';

exports.event_interval_object = {};

exports.init = function() {
	dev_log('init');
	exports.switch_stage('1');
}

exports.switch_stage = function(new_stage) {
	dev_log('switch_stage');
	dev_log(new_stage);
	//меняем текущий этап
	exports.current_stage = new_stage;
	//меняем поле на экране
	face.field_set_value('quest_state', exports.stages_hash[new_stage].description);

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
				dev_log('happened');
				dev_log(event_);
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
						dev_log(condition);
						clearInterval(exports.event_interval_object);
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
	dev_log('parse_variables');
	dev_log(src);
	var dst = src;
	for (var variable in exports.variables_hash) {
		console.log(exports.variables_hash[variable]);
		var re = new RegExp(exports.variables_hash[variable].name, "g");
		dst = dst.replace(re, exports.variables_hash[variable].value);
	}
	return dst;
}

exports.execute_action = function(action) {
	dev_log('execute_action');
	dev_log(action);
	switch(action.type) {
		case 'Внутренняя команда':
			var query = config.web_server_url + '/game/' + action.parameter;
			http.get(query, function(res) {
					res.on('error', function(data){
					});
				}).on('error', function(e) {
					simple_log(query + " error");
			});
			break;

		case 'Команда устройству':
			var args = action.url.split("\/");
			queue.push(args[0], args[1], action.parameter, DISABLE_TIMER);
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
	}
}

exports.submit_event = function (event_type, url, value) {
	dev_log('submit_event');
	dev_log(event_type);
	dev_log(url);
	dev_log(value);
	switch(event_type) {
		case 'Внутреннее событие':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.parameter == url) {
					event_.happened = 1;
					dev_log(event_);
				}
			});
			break;	
		case 'Таймер готов':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.url == url) {
					event_.happened = 1;
					dev_log(event_);
				}
			});
			break;	

		case 'Нажата кнопка':
			dev_log(exports.stages_hash[exports.current_stage]);
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.parameter == url) {
					event_.happened = 1;
					dev_log(event_);
				}
			});
			break;

		case 'Рапорт устройства':
			exports.stages_hash[exports.current_stage].events.forEach(function(event_){
				if (event_.url == url) {
					event_.happened = 1;
					event_.value = value;
					dev_log(event_);
				}
			});
			break;

	}
}