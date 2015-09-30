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
			confirm:     0,
			ajax_url:    '/game/get_ready',
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		start: {
			style_class: 'Start',
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Начать',
			confirm:     0,
			ajax_url:    '/game/start',
			validate_cb: "function (){"
						+    "var gamer_count = $('#inpGamerCount').val();"
						+    "if (!gamer_count) {"
						+        "alert ('Введите количество игроков');"
						+        "return { ok: 0};"
						+    "};"
						+    "if (gamer_count != '2' && gamer_count != '3' && gamer_count != '4') {"
						+        "alert ('Введено неверное количество игроков');"
						+        "return { ok: 0};"
						+    "};"
						+    "return {"
						+        "ok: 1,"
						+        "params: {"
						+            "gamer_count: gamer_count,"
						+        "}"
						+    "};"
						+"}",
			success_cb:  "function (response) {disable_gamer_count();}",
			error_cb:    "function(error) {}",
		},
		service_mode: {
			style_class: 'ServiceMode',
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Включить режим обслуживания',
			confirm:     1,
			ajax_url:    '/game/service_mode',
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		reset_game: {
			style_class: 'ResetGame',
			disabled:    0,
			highlight:   0,
			section:     'Service',
			title:       'Сбросить',
			confirm:     1,
			ajax_url:    '/game/reset',
			success_cb:  "function (response) {enable_gamer_count(); }",
			error_cb:    "function(error) {}",
		},
		all_in: {
			style_class: 'AllIn',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Все зашли внутрь',
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		polyhedron_prompt: {
			style_class: 'PolyhedronPrompt',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Подсказка по многограннику',
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		queue: {
			style_class: 'Queue',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       "Аудио 'в очередь'",
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		start_scan: {
			style_class: 'StartScan',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать игрока',
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},
		stop_scan: {
			style_class: 'StopScan',
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Закончить сканирование игрока',
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
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