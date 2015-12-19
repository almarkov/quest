// кнопки на панели управления
exports.dashboard_buttons = {
};

// поля на панели управления
exports.dashboard_fields = {
};


exports.reset = function () {
	//benchmarks.add('facejs_reset')
	exports.dashboard_buttons = {

		get_ready: {
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Приготовиться к началу квеста',
			confirm:     0,
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
			to_send:     1,
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
						+    "var language = $('#inpLanguage').val();"
						+    "if (!language || language == '-1') {"
						+        "alert ('Выберите язык медиафайлов');"
						+        "return { ok: 0};"
						+    "};"
						+    "return {"
						+        "ok: 1,"
						+        "params: {"
						+            "gamers_count: gamers_count,"
						+            "operator_id:  operator_id,"
						+            "language:     language,"
						+        "}"
						+    "};"
						+"}",
			success_cb:  "function (response) {}",
			error_cb:    "function(error) {}",
			to_send:     1,
		},

		service_mode: {
			disabled:    1,
			highlight:   0,
			section:     'Service',
			title:       'Включить режим обслуживания',
			confirm:     1,
			to_send:     1,
		},

		reset_game: {
			disabled:    0,
			highlight:   0,
			section:     'Service',
			title:       'Сбросить',
			confirm:     1,
			success_cb:  "function (response) {"
						+     "alert('Reloading..');"
						+     "$('#inpOperatorId').val(-1);"
						+     "$('#inpLanguage').val(-1);"
						+     "$('#inpGamerCount').val('');"
						+     "shown=0;"
						+"}",
			error_cb:    "function(error) {}",
			to_send:     1,
		},
/*
		switch_stage: {
			disabled:    0,
			highlight:   0,
			section:     'Quest',
			ajax_url:    '/game/switch_stage',
			title:       "Переключить на этап",
			validate_cb: "function (){"
						+    "var new_stage = $('#inpNewStage').val();"
						+    "if (!new_stage) {"
						+        "alert ('Введите этап');"
						+        "return { ok: 0};"
						+    "};"
						+    "return {"
						+        "ok: 1,"
						+        "params: {"
						+            "new_stage: new_stage,"
						+        "}"
						+    "};"
						+"}",
			confirm:     0,
			to_send:     1,
		},

		players_start: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Все игроки на старте',
			confirm:     1,
			success_cb:  "function (response) { }",
			error_cb:    "function(error) { }",
			to_send:     1,
		},

		chamber_overloaded: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Камера перегружена',
			confirm:     1,
			to_send:     1,
		},

		scan_last_group: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать последнюю группу людей',
			confirm:     1,
			to_send:     1,
		},
		scan_not_last_group: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       'Сканировать непоследнюю группу людей',
			confirm:     1,
			to_send:     1,
		},

		confirm_end_scan: {
			disabled:    1,
			highlight:   0,
			section:     'Quest',
			title:       "Подтвердить окончание сканирования",
			confirm:     1,
			to_send:     1,
		},
*/
		
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
			to_send:  1,
		},
		operator_id: {
			name:     '_operator_id',
			type:     'select',
			source_type: 'db',
			source:   'operators',
			label:    'Оператор',
			id:       'inpOperatorId',
			select_text: 'Выберите оператора',
			disabled: 0,
			section:  'Service',
			value:    '',
			to_send:  1,
		},
		language: {
			name:     '_language',
			type:     'select',
			source_type: 'raw',
			source:   [
				{_id:'english', name: 'Английский'},
				{_id:'spanish', name: 'Испанский'}
			],
			label:    'Язык медиафайлов',
			id:       'inpLanguage',
			select_text: 'Выберите язык',
			disabled: 0,
			section:  'Service',
			value:    '',
			to_send:  1,
		},
		quest_state: {
			type:     'static',
			label:    'Состояние квеста',
			id:       'QuestState',
			section:  'Service',
			value:    'NA',
			to_send:  1,
		},
		timer_state: {
			type:     'static',
			label:    'Таймер',
			id:       'TimerState',
			section:  'Service',
			value:    'NA',
			to_send:  1,
		},
		quest_timer: {
			type:     'static',
			label:    'Обратный отсчёт',
			id:       'QuestTimer',
			section:  'Quest',
			value:    'NA',
			to_send:  1,
		},
		/*new_stage: {
			name:     '_new_stage',
			type:     'text',
			label:    'Этап',
			id:       'inpNewStage',
			disabled: 0,
			section:  'Quest',
			value:    '',
			to_send:  1,
		},*/
	};
};

exports.button_highlight_on = function(button){
	//benchmarks.add('facejs_button_highlight_on')
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 1;
		exports.dashboard_buttons[button].to_send += 1;
	}
};

exports.button_highlight_off = function(button){
	//benchmarks.add('facejs_button_highlight_off')
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].highlight = 0;
		exports.dashboard_buttons[button].to_send += 1;
	}
};

exports.button_disable = function(button){
	//benchmarks.add('facejs_button_disable')
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 1;
		exports.dashboard_buttons[button].to_send += 1;
	}
};

exports.button_enable = function(button){
	//benchmarks.add('facejs_button_enable')
	if (exports.dashboard_buttons[button]) {
		exports.dashboard_buttons[button].disabled = 0;
		exports.dashboard_buttons[button].to_send += 1;
	}
};

exports.field_set_value = function(field, value){
	//benchmarks.add('facejs_field_set_value')
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].value = value;
		exports.dashboard_fields[field].to_send += 1;
	}
}

exports.field_disable = function(field){
	//benchmarks.add('facejs_field_disable')
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].disabled = 1;
		exports.dashboard_fields[field].to_send += 1;
	}
}

exports.field_enable = function(field){
	//benchmarks.add('facejs_field_enable')
	if (exports.dashboard_fields[field]) {
		exports.dashboard_fields[field].disabled = 0;
		exports.dashboard_fields[field].to_send += 1;
	}
}

exports.get = function() {
	//benchmarks.add('facejs_get')
	return {
		dashboard_buttons: exports.dashboard_buttons,
		dashboard_fields:  exports.dashboard_fields,
	}
}