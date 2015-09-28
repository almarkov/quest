var dev_url         = "http://localhost:3000";
var web_server_url   = "http://localhost:3000";

var start_time;
var game_timer;
var m, s;

var external_config;
var config_list = [];
var prev_response = {};
$.ajax({
	url: web_server_url + '/devices_list/config',
	type: "GET",
	crossDomain: true,
	dataType: "json",
		success: function (response) {
			external_config = response;
		},
		error: function(error) {
		}
});

function build_query(device, command, parameter) {
	return web_server_url
		+ "/game/emulate_command"
		+ '/' + device + '/'+ command + '/' + parameter;
}

function disable_gamer_count() {
	$("#inpGamerCount").prop('disabled', true);
}

function enable_gamer_count() {
	$("#inpGamerCount").prop('disabled', false);
	$("#inpGamerCount").val('');
}

function stop_timer() {
	if (game_timer) {
    	clearInterval(game_timer);
    }
}

function restart_timer () {
	// получаем дату старта для таймера игры
	start_time = null;
	var now = new Date();
	$.ajax({
		url: web_server_url + '/game/start_time',
		type: "GET",
		crossDomain: true,
		dataType: "json",
		success: function (response) {
			if (response.date) {
				start_time = new Date(response.date);
				var diff = start_time - now + 60*60*1000 ;
				var ms = diff % 1000;
				s  = ((diff - ms)/1000) % 60;
				m  = ((diff - ms - s* 1000)/60000) % 60;

				//таймер квеста(1час)
				game_timer = setInterval(function () {
					s = s - 1;
					if (s == -1) {
						m = m-1;
						s = 59;
					}
					if (start_time) {
						if (m < 0) {
							//$("#QuestTimer").text('Время вышло. Квест провален');
						} else {
							//$("#QuestTimer").text(parseInt(m) + ':' + parseInt(s));
						}
					} else {
						//$("#QuestTimer").text('NA');
					}
				}, 1000);

				disable_gamer_count();
			} else {

				stop_timer();
				enable_gamer_count();
				//$("#QuestTimer").text('NA');
				return;
			}
		},
		error: function(error) {
		}
	});

	
}

$(document).ready(function() {

	$.ajax({
		url: web_server_url + '/devices_list/all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				var content_top = generate_content_top(response);
				$('#Content').prepend(content_top);
				set_handlers();
			},
			error: function(error) {
			}
	});

	if (!start_time) {
		restart_timer();
	}
	for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
	}
	// проверяем состояние устройств
	setInterval(function(){
		$.ajax({
		url: web_server_url + '/devices_list/all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {

				// двери
				for (var i = 1; i <= 8; i++) {
					if (response["door_" + i].state == "opened") {
						$("#inpDoor" + i).val('Открыта');
					} else if (response["door_" + i].state == "closed") {
						$("#inpDoor" + i).val('Закрыта');
					} else if (response["door_" + i].state == "no_info") {
						$("#inpDoor" + i).val('Неизвестно');
					}
				}
				// аудиоплееры
				for (var i = 1; i <= 4; i++) {
					if (response["audio_player_" + i].state == "ch1_stop_ch2_stop") {
						$("#inpAudioPlayer" + i).val('Оба канала выключены');
					} else if (response["audio_player_" + i].state == "ch1_play_ch2_stop") {
						$("#inpAudioPlayer" + i).val('Только канал 1 включён' + response["audio_player_" + i].value);
					} else if (response["audio_player_" + i].state == "ch1_stop_ch2_play") {
						$("#inpAudioPlayer" + i).val('Только канал 2 включён' + response["audio_player_" + i].value);
					} else if (response["audio_player_" + i].state == "ch1_play_ch2_play") {
						$("#inpAudioPlayer" + i).val('Оба канала включены' + response["audio_player_" + i].value);
					}
				}

				// видеооплееры
				for (var i = 1; i <= 3; i++) {
					if (response["video_player_" + i].state == "playing") {
						$("#inpVideoPlayer" + i).val('Играет видео' + response["video_player_" + i].value);
					} else if (response["video_player_" + i].state == "stopped") {
						$("#inpVideoPlayer" + i).val('Показывает чёрный экран');
					}
				}

				// ячейки
				var codes = [];
				codes[5] = response.codes[4];// фиолетовая
				// хак
				if (response.gamers_count == 2) {
					codes[4] = response.codes[0];
					codes[1] = response.codes[1];
					codes[2] = '';
					codes[3] = '';
				} else if (response.gamers_count == 3) {
					codes[4] = response.codes[1];
					codes[1] = response.codes[0];
					codes[2] = response.codes[2];
					codes[3] = '';
				} else if (response.gamers_count == 4) {
					codes[4] = response.codes[2];
					codes[1] = response.codes[0];
					codes[2] = response.codes[1];
					codes[3] = response.codes[3];
				}

				for (var i = 1; i <= 5; i++) {
					if (response["cell_" + i].state == "opened") {
						$("#inpCell" + i + "State").val('Открыта. ' + codes[i]);
					} else if (response["cell_" + i].state == "closed") {
						$("#inpCell" + i + "State").val('Закрыта. ' + codes[i]);
					}
				}

				// терминалы
				for (var i = 1; i <= 4; i++) {
					if (response["terminal_" + i].state == "active") {
						$("#inpTerminal" + i + "State").val('Игра');
					} else if (response["terminal_" + i].state == "sleep") {
						$("#inpTerminal" + i + "State").val('Сон');
					}
				}

				// таймер
				$("#inpTimer").val(response.timer.current_value.toString());
				if (response.timer.state == "active") {
					$("#inpTimerState").val('Активен');
				} else if (response.timer.state == "ready") {
					$("#inpTimerState").val('Готов');
				} else if (response.timer.state == "idle") {
					$("#inpTimerState").val('Неактивен');
				}

				// многогранник
				if (response['polyhedron'].state == "activated") {
					$("#inpPolyhedron").val('Активирован');
				} else if (response['polyhedron'].state == "not_installed") {
					$("#inpPolyhedron").val('Не на подставке');
				} else if (response['polyhedron'].state == "installed_no_link") {
					$("#inpPolyhedron").val('На подставке, нет связи');
				} else if (response['polyhedron'].state == "installed_link_ok") {
					$("#inpPolyhedron").val('На подставке, на связи');
				}

				// свет
				if (response['light'].state == "on") {
					$("#inpLight").val('Включён');
				} else if (response['light'].state == "off") {
					$("#inpLight").val('Выключен');
				}

				// ремни
				$("#inpSafetyBelts").val('Пристёгнуто ' + response['safety_belts'].value + ' игроков');

				// вибрация
				if (response['vibration'].state == "on") {
					$("#inpVibration").val('Включёна');
				} else if (response['vibration'].state == "off") {
					$("#inpVibration").val('Выключена');
				}

				// подсветка
				if (response['inf_mirror_backlight'].state == "on") {
					$("#inpInfMirrorBacklightState").val('Светится ' + response['inf_mirror_backlight'].value);
				} else if (response['inf_mirror_backlight'].state == "off") {
					$("#inpInfMirrorBacklightState").val('Не светится');
				}

				// статуя
				$("#inpFigureState").val('Вставлено ' + response['figure'].value + ' жетонов');

				// шкаф RFID
				if (response['locker_2'].state == "opened") {
					$("#inpLocker2").val('Открыт');
				} else if (response['locker_2'].state == "closed") {
					$("#inpLocker2").val('Закрыт');
				}

				// считыватель карты
				if (response['card_reader'].state == "passed") {
					$("#inpCardReader").val('Пройдено');
				} else if (response['card_reader'].state == "not_passed") {
					$("#inpCardReader").val('Не пройдено');
				}

				// дым-машина
				if (response['smoke'].state == "on") {
					$("#inpSmoke").val('Включена');
				} else if (response['smoke'].state == "off") {
					$("#inpSmoke").val('Выключена');
				}

				// энергостена
				if (response['power_wall'].state == "passed") {
					$("#inpPowerWall").val('Пройдено');
				} else if (response['power_wall'].state == "not_passed") {
					$("#inpPowerWall").val('Не пройдено');
				}

				// статусы устройств
				$(".Status").removeClass("Offline");
				external_config.forEach(function f(device) {
					var element = device.name;
					// хак
					var device_element = $("[name=" + element + "_state]");
					if (!device_element.length) {
						device_element = $("[name=" + element);
					}
					// хак
					var element_state = device_element.parent().parent().find(".Status");
					if (response[element].wd_state == 0) {
						element_state.removeClass("Online");
						element_state.removeClass("Emulating");
						element_state.addClass("Offline");
						device_element.val('Не определён');
					} else {
						element_state.removeClass("Offline");
						if (response[element].wd_emulate) {
							element_state.removeClass("Online");
							element_state.addClass("Emulating");
						} else {
							element_state.removeClass("Emulating");
							element_state.addClass("Online");
						}
					}
				});

				// обновляем кнопки
				$.each(response.face.dashboard_buttons, function( index, item ) {

					$(".DashBoard ." + item.style_class).prop('disabled', item.disabled);

					$(".DashBoard ." + item.style_class).removeClass('Active');
					if (item.highlight) {
						$(".DashBoard ." + item.style_class).addClass('Active');
					}
				});

				// обновляем поля
				$.each(response.face.dashboard_fields, function( index, item ) {

					if (item.type == 'text') {
						$(".State #" + item.id).prop('disabled', item.disabled);
					} else if (item.type == 'static') {
						$("#" + item.id).text(item.value);
					}
				});

				if (response.quest_completed) {
					stop_timer();
				}

				prev_response = response;

			},
			error: function(error) {
			}
		});
	}, 1000);

});

//-----------------------------------------------------------------------------
// Генерация HTML
//-----------------------------------------------------------------------------
function generate_content_top(data) {
	var raw_html = '';
	$.each(['Service', 'Quest', 'Test'], function(index, item) {
		raw_html += generate_top_section(item, data);
	});
	return raw_html;
}

function generate_top_section (section_name, data) {
	var raw_html = "<div id='" + section_name + "'>"
				+ generate_state_top_section (section_name, data)
				+ generate_dashboard_top_section (section_name, data)
				+ "</div>";

	return raw_html;
}

function generate_state_top_section (section_name, data){
	var raw_html = "<ul class='State'>";

	$.each(data.face.dashboard_fields, function(index, item) {
		if (item.section == section_name) {
			raw_html += "<li>";
			if (item.type == 'static') {
				raw_html += "<label for='" + item.id + "' class='Label2'>" + item.label + ": </label>"
							+ "<span id='" + item.id + "'>" + item.value + "</span>";
			} else if (item.type == 'text') {
				raw_html += "<label for='" + item.id + "' class='Label1'>" + item.label + ": </label>"
							+ "<input type='text' name='" + item.name + "' item='" + item.value + "' id='" + item.id + "' class='Input1' />";
			}
			raw_html += "</li>";
		}
	});

	raw_html += "</ul>";

	return raw_html;
}

function generate_dashboard_top_section (section_name, data){

	var raw_html = "<ul class='DashBoard'>";

	$.each(data.face.dashboard_buttons, function(index, item) {
		if (item.section == section_name) {
			raw_html += "<li>"
					+ "<input type='button' class='" + item.style_class + " BType_01' value='" + item.title + "'>"
					+ "</li>";
		}
	});
	raw_html += "</ul>";

	return raw_html;
}

function generate_device (data) {
	var raw_html =    "<div class='Device'>"
					+     "<div class='Status Online'>"
					+     "</div>"
					+     "<div class='State'>"
					+         "<label for='inpTimer' class='Label1'>Таймер</label>"
					+         "<input type='text' name='_timer' value='' id='inpTimer' class='Input2' disabled/>"
					+         "<input type='text' name='_timer_state' value='' id='inpTimerState' class='Input1' disabled/>"
					+     "</div>"
					+     "<div class='Commands'>"
					+         "<ul class='Timer'>"
					+             "<li><a class='Set BType_01'><span>Включить</span></a></li>"
					+             "<li><a class='Stop BType_01'><span>Выключить</span></a></li>"
					+         "</ul>"
					+     "</div>"
					+ "</div>";
}

function set_handlers() {
	//-----------------------------------------------------------------------------
	// Управление игрой
	//-----------------------------------------------------------------------------
	// Подготовка устройств
	$('.DashBoard .GetReady').click(function(e){
		$.ajax({
			url: web_server_url + '/game/get_ready',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
				},
				error: function(error) {
				}
		});
	});
	// Инициализация игры
	$('.DashBoard .Start').click(function(e){
		if (!$("#inpGamerCount").val()) {
			alert ('Введите количество игроков');
			return;
		}
		var gamer_count = $("#inpGamerCount").val();
		if (gamer_count == '2' || gamer_count == '3' || gamer_count == '4') {
			$.ajax({
			url: web_server_url + '/game/start' + '/' + gamer_count,
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					$("#inpGamerCount").prop('disabled', true);
					restart_timer();
				},
				error: function(error) {
				}
			});
		} else {
			alert ('Введено неверное количество игроков');
			return;	
		}
		
	});

	// режим обслуживания
	$('.DashBoard .ServiceMode').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/service_mode',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// калибровка цветовых сенсоров
	$('.DashBoard .Calibrate').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('figure', 'calibrate', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Восстанавливаем в модели значения по умолчанию
	$('.DashBoard .ResetGame').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/reset',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
						enable_gamer_count();
						start_time = null;
						$("#QuestTimer").text("NA");
						stop_timer();
					},
					error: function(error) {
						enable_gamer_count();
						start_time = null;
						$("#QuestTimer").text("NA");
						stop_timer();
					}
			});
		}
	});

	// Все зашли
	$('.DashBoard .AllIn').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/allin',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Включить аудио 'В очередь'
	$('.DashBoard .Queue').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/queue',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// подсказка по многограннику
	$('.DashBoard .PolyhedronPrompt').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/polyhedron_prompt',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Начать сканирование
	$('.DashBoard .StartScan').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/scanner/start',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Завершить сканирование игрока
	$('.DashBoard .StopScan').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/scanner/stop',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});


	// Завершить сканирование
	$('.DashBoard .StopScanAll').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/scanner/stop_all',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	$('.DashBoard .ClosePowerWall').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: web_server_url + '/game/close_power_wall',
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	//-----------------------------------------------------------------------------
	// управление устройствами
	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие двери
	//-----------------------------------------------------------------------------
	for (var i = 1; i <= 8; i++) {
		// Кнопка открывающая дверь
		$('#Main .Door' + i + ' .Open').click(function(e){
			if (confirm("Подтвердите действие")){
				var name = $(e.srcElement).parents(".Device").find(".Input1")[0].name;
				$.ajax({
					url: build_query(name, 'open', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
		// Кнопка закрывающая дверь
		$('#Main .Door' + i + ' .Close').click(function(e){
			if (confirm("Подтвердите действие")){
				var name = $(e.srcElement).parents(".Device").find(".Input1")[0].name;
				$.ajax({
					url: build_query(name, 'close', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
	}

	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие события аудиоплеера
	//-----------------------------------------------------------------------------
	for (var i = 1; i <= 4; i++) {
		// Кнопка окончания канала 1
		$('#Main .AudioPlayer' + i + ' .Stopped1').click(function(e){
			if (confirm("Подтвердите действие")){
				var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
				$.ajax({
					url: build_query(name, 'ch1_playback_finished', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
		// Кнопка окончания канала 2
		$('#Main .AudioPlayer' + i + ' .Stopped2').click(function(e){
			if (confirm("Подтвердите действие")){
				var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
				$.ajax({
					url: build_query(name, 'ch2_playback_finished', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
	}

	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие события видеоплеера
	//-----------------------------------------------------------------------------
	for (var i = 1; i <= 3; i++) {
		// Кнопка окончания видео
		$('#Main .VideoPlayer' + i + ' .Stopped').click(function(e){
			if (confirm("Подтвердите действие")){
				var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
				$.ajax({
					url: build_query(name, 'playback_finished', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
	}

	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие кнопки
	//-----------------------------------------------------------------------------
	// Кнопка открывающая шкаф
	$('#Main .Locker1Button .Push').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('locker_1_button', 'pushed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка открывающая шкаф
	$('#Main .Locker2 .Open').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('locker_2', 'open', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка открывающая шкаф
	$('#Main .Locker2 .Close').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('locker_2', 'close', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});


	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие устройства
	//-----------------------------------------------------------------------------
	// Кнопка 'Активировать многогранник
	$('#Main .Polyhedron .On').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('polyhedron', 'activated', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'Поставить многогранник'
	$('#Main .Polyhedron .Stand').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('polyhedron', 'connected', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});


	// Кнопка 'пристегнуть ремни'
	$('#Main .SafetyBelts .On').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('safety_belts', 'number_of_fastened', '10'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'вставить жетоны'
	$('#Main .Figure .Insert').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('figure', 'number_of_inserted', 9),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'приложить карту'
	$('#Main .CardReader .Ok').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('card_reader', 'card_ok', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'включить свет'
	$('#Main .Light .On').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('light', 'on', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'выключить свет'
	$('#Main .Light .Off').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('light', 'off', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'включить вибрацию'
	$('#Main .Vibration .On').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('vibration', 'on', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'выключить вибрацию'
	$('#Main .Vibration .Off').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('vibration', 'off', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'включить дым'
	$('#Main .Smoke .On').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('smoke', 'on', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'выключить дым'
	$('#Main .Smoke .Off').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('smoke', 'off', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'энергостена пройдена'
	$('#Main .PowerWall .Ok').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('power_wall', 'power_ok', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка спасения предпоследнего игрока
	$('#Main .SaveButton .Push').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('save_button', 'pushed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие планшеты
	//-----------------------------------------------------------------------------
	// Кнопка 'Отправить' - для отправки кода на планшете1
	$('#Main .Terminal1 .SendRight').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_1', 'code_entered', $("#inpTerminal1").val()),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'Игра пройдена' - для прохождения игры на планшете2
	$('#Main .Terminal2 .SendRight').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_2', 'game_passed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'Игра не пройдена' - для прохождения игры на планшете2
	$('#Main .Terminal2 .SendWrong').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_2', 'game_failed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'Игра пройдена' - для прохождения игры на планшете3
	$('#Main .Terminal3 .SendRight').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_3', 'game_passed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// Кнопка 'Игра не пройдена' - для прохождения игры на планшете3
	$('#Main .Terminal3 .SendWrong').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_3', 'game_not_passed', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	// Кнопка 'Отправить верно' - для отправки координат на планшете4
	$('#Main .Terminal4 .SendRight').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_4', 'coordinates_entered_true', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	// кнопки терминалов запустить принудительно
	$('#Main .Terminal1 .Force').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_1', 'go', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	$('#Main .Terminal2 .Force').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_2', 'go', 'right=0;6;7;9;14'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	$('#Main .Terminal3 .Force').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_3', 'go', '0'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});
	$('#Main .Terminal4 .Force').click(function(e){
		if (confirm("Подтвердите действие")){
			$.ajax({
				url: build_query('terminal_4', 'go', '0/right=9847544'),
				type: "GET",
				crossDomain: true,
				dataType: "json",
					success: function (response) {
					},
					error: function(error) {
					}
			});
		}
	});

	//-----------------------------------------------------------------------------
	// Кнопки, эмулирующие ячейки
	//-----------------------------------------------------------------------------
	// Кнопки 'Отправить' - для отправки значения ячейки, 'Закрыть', 'Открыть'
	for (var i = 1; i <= 5; i++) {
		$('#Main .Cell' + i + ' .Send').click(function(e){
			if (confirm("Подтвердите действие")){
				var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
				$.ajax({
					url: build_query(element.name, 'code_entered', element.value),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
		$('#Main .Cell' + i + ' .Open').click(function(e){
			if (confirm("Подтвердите действие")){
				var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
				$.ajax({
					url: build_query(element.name, 'open', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
		$('#Main .Cell' + i + ' .Close').click(function(e){
			if (confirm("Подтвердите действие")){
				var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
				$.ajax({
					url: build_query(element.name, 'close', '0'),
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		});
	}

	// перезагрузка устройства
	$('#Main .Device .Status').click(function(e){
		var element = e.srcElement.parentElement.children[1].children[1].name;
		var name = element.replace('_state', '');
		if (!name.match(/terminal|audio_player|video_player/)) {
			if (confirm("Подтвердите перезагрузку")){
				$.ajax({
					url: web_server_url + '/sendcom/reload/' + name,
					type: "GET",
					crossDomain: true,
					dataType: "json",
						success: function (response) {
						},
						error: function(error) {
						}
				});
			}
		}
	});

}