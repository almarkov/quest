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
		};
	}

	// этапы, действия, условия
	var stages = obj[0].data;
	var stage_fields = [
		'stage_no',
		'stage_description',

		'stage_action_description',
		'stage_action_type',
		'stage_action_arg',

		'event_description',
		'event_type',
		'event_arg',

		'event_action_description',
		'event_action_condition',
		'event_action_type',
		'event_action_arg',
	];

	for (var i = 2; i < stages.length; i++) {
		var item = {};
		for (var j = 0; j < stage_fields.length; j++) {
			item[stage_fields[j]] = stages[i][j];
		}

		if (item.stage_no) {
			exports.stages_hash[item.stage_no] = {
				no:          item.stage_no,
				description: item.stage_description,
			};
		}
	}
	console.log(exports.stages_hash);

}