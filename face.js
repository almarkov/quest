// кнопки на панели управления
exports.dashboard_buttons = {
};


exports.reset = function () {
	exports.dashboard_buttons = {
		get_ready: {
			style_class: 'GetReady',
			disabled:    1,
			highlight:   0,
			title:       'Приготовиться к началу квеста',
		},
		start: {
			style_class: 'Start',
			disabled:    1,
			highlight:   0,
			title:       'Начать',
		},
		service_mode: {
			style_class: 'ServiceMode',
			disabled:    1,
			highlight:   0,
			title:       'Включить режим обслуживания',
		},
		reset_game: {
			style_class: 'ResetGame',
			disabled:    0,
			highlight:   0,
			title:       'Сбросить',
		},
		all_in: {
			style_class: 'AllIn',
			disabled:    1,
			highlight:   0,
			title:       'Все зашли внутрь'
		},
		polyhedron_prompt: {
			style_class: 'PolyhedronPrompt',
			disabled:    1,
			highlight:   0,
			title:       'Подсказка по многограннику'
		},
		queue: {
			style_class: 'Queue',
			disabled:    1,
			highlight:   0,
			title:       "Аудио 'в очередь'",
		},
		start_scan: {
			style_class: 'StartScan',
			disabled:    1,
			highlight:   0,
			title:       'Сканировать игрока'
		},
		stop_scan: {
			style_class: 'StopScan',
			disabled:    1,
			highlight:   0,
			title:       'Закончить сканирование игрока'
		},
	};
};

exports.highlight_on = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 1;
	}
};

exports.highlight_off = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 0;
	}
};

exports.disable = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 1;
	}
};

exports.enable = function(button){
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 0;
	}
};

exports.get = function() {
	return {
		dashboard_buttons: exports.dashboard_buttons,
	}
}