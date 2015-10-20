// кнопки на панели управления
exports.dashboard_buttons = {
};

// поля на панели управления
exports.dashboard_fields = {
};


exports.reset = function () {
	exports.dashboard_buttons = {

		get_ready: {
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Приготовиться к началу квеста',
			confirm:     0,
			ajax_url:    '/game/get_ready',
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},

		start_game: {
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Начать игру',
			confirm:     0,
			ajax_url:    '/game/start_game',
			validate_cb: "function (){"
						+    "var gamers_count = $('#inpGamerCount').val();"
						+    "if (!gamers_count) {"
						+        "alert ('Введите количество игроков');"
						+        "return { ok: 0};"
						+    "};"
						+    "if (gamers_count != '2' && gamers_count != '3' && gamers_count != '4' && gamers_count != '5') {"
						+        "alert ('Введено неверное количество игроков');"
						+        "return { ok: 0};"
						+    "};"
						+    "var operator_id = $('#inpOperatorId').val();"
						+    "if (!operator_id || operator_id == '-1') {"
						+        "alert ('Выберите оператора');"
						+        "return { ok: 0};"
						+    "};"
						+    "return {"
						+        "ok: 1,"
						+        "params: {"
						+            "gamers_count: gamers_count,"
						+            "operator_id: operator_id,"
						+        "}"
						+    "};"
						+"}",
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},

		service_mode: {
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Включить режим обслуживания',
			confirm:     1,
			ajax_url:    '/game/service_mode',
		},

		reset_game: {
			disabled:    0,
			highlight:   0,
			section:     'Service',
			title:       'Сбросить',
			confirm:     1,
			ajax_url:    '/game/reset',
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
		},

		players_start: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Все игроки на старте',
			confirm:     1,
			ajax_url:    '/game/players_start',
			success_cb:  "function (response) { }",
			error_cb:    "function(error) { }",
		},

		chamber_overloaded: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Камера перегружена',
			confirm:     1,
			ajax_url:    '/game/chamber_overloaded',
		},

		scan_last_group: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать последнюю группу людей',
			confirm:     1,
			ajax_url:    '/scanner/scan_last_group',
		},
		scan_not_last_group: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать непоследнюю группу людей',
			confirm:     1,
			ajax_url:    '/scanner/scan_not_last_group',
		},

		confirm_end_scan: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       "Подтвердить окончание сканирования",
			confirm:     1,
			ajax_url:    '/game/confirm_end_scan',
		},
	};

	exports.dashboard_fields = {
		gamers_count: {
			name:     '_gamers_count',
			type:     'text',
			label:    'Число игроков',
			id:       'inpGamerCount',
			disabled: 0,
			section:  'Service',
			value:    '',
		},
		operator_id: {
			name:     '_operator_id',
			type:     'select',
			source:   'operators',
			label:    'Оператор',
			id:       'inpOperatorId',
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