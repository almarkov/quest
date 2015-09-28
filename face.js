// кнопки на панели управления
exports.dashboard_buttons = {
};

// поля на панели управления
exports.dashboard_fields = {
};


exports.reset = function () {
	exports.dashboard_buttons = {
		get_ready: {
			style_class: 'GetReady',
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Приготовиться к началу квеста',
		},
		start: {
			style_class: 'Start',
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Начать',
		},
		service_mode: {
			style_class: 'ServiceMode',
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Включить режим обслуживания',
		},
		reset_game: {
			style_class: 'ResetGame',
			disabled:    0,
			highlight:   0,
			section:     'Service',
			title:       'Сбросить',
		},
		all_in: {
			style_class: 'AllIn',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Все зашли внутрь'
		},
		polyhedron_prompt: {
			style_class: 'PolyhedronPrompt',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Подсказка по многограннику'
		},
		queue: {
			style_class: 'Queue',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       "Аудио 'в очередь'",
		},
		start_scan: {
			style_class: 'StartScan',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать игрока'
		},
		stop_scan: {
			style_class: 'StopScan',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Закончить сканирование игрока'
		},
	};

	exports.dashboard_fields = {
		gamer_count: {
			name:     '_gamer_count',
			type:     'text',
			label:    'Число игроков',
			id:       'inpGamerCount',
			disabled: 0,
			section:  'Service',
			value:    '',
		},
		quest_state: {
			type:     'static',
			label:    'Состояние квеста',
			id:       'QuestState',
			section:  'Service',
			value:    'NA',
		},
		timer_state: {
			type:     'static',
			label:    'Таймер',
			id:       'TimerState',
			section:  'Service',
			value:    'NA',
		},
		quest_timer: {
			type:     'static',
			label:    'Обратный отсчёт',
			id:       'QuestTimer',
			section:  'Quest',
			value:    'NA',
		},
	};
};

exports.button_highlight_on = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 1;
	}
};

exports.button_highlight_off = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 0;
	}
};

exports.button_disable = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 1;
	}
};

exports.button_enable = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 0;
	}
};

exports.field_set_value = function(field, value){
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].value = value;
	}
}

exports.field_disable = function(field){
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].disabled = 1;
	}
}

exports.field_enable = function(field){
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].disabled = 0;
	}
}

exports.get = function() {
	return {
		dashboard_buttons: exports.dashboard_buttons,
		dashboard_fields:  exports.dashboard_fields,
	}
}