var dev_url         = "http://localhost:3000";
var web_server_url   = "http://localhost:3000";

var start_time;
var game_timer;
var m, s;

function disable_gamer_count() {
	$("#inpGamerCount").prop('disabled', true);
}

function enable_gamer_count() {
	$("#inpGamerCount").prop('disabled', false);
}

function stop_timer() {
    clearInterval(game_timer);
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
			console.log(response);
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
						$("#QuestTimer").text(parseInt(m) + ':' + parseInt(s));
					} else {
						$("#QuestTimer").text('NA');
					}
				}, 1000);

				disable_gamer_count();
			} else {

				stop_timer();
				enable_gamer_count();
				$("#QuestTimer").text('NA');
				return;
			}
		},
		error: function(error) {
				console.log('ERROR:', error);
			}
	});

	
}

$(document).ready(function() {

	if (!start_time) {
		restart_timer();
	}

	// проверяем состояние устройств
	// в данном случае - читаем коллекцию devices из mongo
	setInterval(function(){
		$.ajax({
		url: web_server_url + '/devices_list/all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('Devices state');
				// двери
				for (var i = 1; i <= 8; i++) {
					if (response["door_" + i].state == "opened") {
						$("#inpDoor" + i).val('Открыта');
					} else if (response["door_" + i].state == "closed") {
						$("#inpDoor" + i).val('Закрыта');
					}
				}

				// аудиоплееры
				for (var i = 1; i <= 5; i++) {
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
				for (var i = 1; i <= 4; i++) {
					if (response["video_player_" + i].state == "playing") {
						$("#inpVideoPlayer" + i).val('Играет видео' + response["video_player_" + i].value);
					} else if (response["video_player_" + i].state == "stopped") {
						$("#inpVideoPlayer" + i).val('Показывает чёрный экран');
					}
				}

				// ячейки
				for (var i = 1; i <= 5; i++) {
					if (response["cell_" + i].state == "opened") {
						$("#inpCell" + i + "State").val('Открыта');
					} else if (response["cell_" + i].state == "closed") {
						$("#inpCell" + i + "State").val('Закрыта');
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

				// кнопка, открывающая шкаф
				// if (response["locker_1_button"].state == "pushed") {
				// 	$("#inpLocker1Button").val('Уже была нажата');
				// } else if (response["locker_1_button"].state == "not_pushed") {
				// 	$("#inpLocker1Button").val('Ещё не была нажата');
				// }

				// таймер
				$("#inpTimer").val(response.timer.current_value.toString());
				if (response.timer.state == "active") {
					$("#inpTimerState").val('Активен');
				} else if (response.timer.state == "ready") {
					$("#inpTimerState").val('Готов');
				} else if (response.timer.state == "idle") {
					$("#inpTimerState").val('Неактивен');
				}

				// дверь шкафа
				// if (response['locker_1'].state == "opened") {
				// 	$("#inpLocker1").val('Открыт');
				// } else if (response['locker_1'].state == "closed") {
				// 	$("#inpLocker1").val('Закрыт');
				// }

				// многогранник
				if (response['polyhedron'].state == "activated") {
					$("#inpPolyhedron").val('Активен');
				} else if (response['polyhedron'].state == "disconnected") {
					$("#inpPolyhedron").val('Неактивен');
				} else if (response['polyhedron'].state == "connected") {
					$("#inpPolyhedron").val('На подставке');
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

				// RFID карта
				if (response['card_holder'].state == "given") {
					$("#inpCardHolder").val('Выдана');
				} else if (response['card_holder'].state == "not_given") {
					$("#inpCardHolder").val('Не выдана');
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

				$(".DashBoard").find(".BType_01").removeClass("Active");
				if (response.active_button) {
					$("." + response.active_button).addClass("Active");
				}

				$("#QuestState").text(response.quest_state);
				$("#QuestError").text(response.quest_error);
				if (response.codes) {
					var codes = '';
					for (var i = 0; i < response.codes.length; i++) {
						codes += response.codes[i] + ',';
					}
					$("#QuestCodes").text(codes);
				}
				$("#LastPlayerPass").text(response.last_player_pass ? "Прошёл" : "Не прошёл");

			},
			error: function(error) {
				console.log('ERROR:', error);
			}
		});
	}, 500);

});

//-----------------------------------------------------------------------------
// Кнопкки управления игрой
//-----------------------------------------------------------------------------
// Подготовка устройств
$('.DashBoard .GetReady').click(function(e){
	$.ajax({
		url: web_server_url + '/game/get_ready',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('get ready');
			},
			error: function(error) {
				console.log('ERROR:', error);
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
	$.ajax({
		url: web_server_url + '/game/start' + '/' + gamer_count,
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				$("#inpGamerCount").prop('disabled', true);
				console.log('game start');
				restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// режим обслуживания
$('.DashBoard .ServiceMode').click(function(e){
	$.ajax({
		url: web_server_url + '/game/service_mode',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('service mode');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Восстанавливаем в модели значения по умолчанию
$('.DashBoard .Reset').click(function(e){
	$.ajax({
		url: web_server_url + '/game/reset',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				$("#inpGamerCount").prop('disabled', false);
				console.log('game reset');
				restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Все зашли
$('.DashBoard .AllIn').click(function(e){
	$.ajax({
		url: web_server_url + '/game/allin',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('start audio');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Включить аудио 'В очередь'
$('.DashBoard .Queue').click(function(e){
	$.ajax({
		url: web_server_url + '/game/queue',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('start audio');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Начать сканирование
$('.DashBoard .StartScan').click(function(e){
	$.ajax({
		url: web_server_url + '/scanner/start',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				//$("#inpGamerCount").prop('disabled', false);
				console.log('start scan');
				//restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Завершить сканирование игрока
$('.DashBoard .StopScan').click(function(e){
	$.ajax({
		url: web_server_url + '/scanner/stop',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				//$("#inpGamerCount").prop('disabled', false);
				console.log('stop scan');
				//restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});


// Завершить сканирование
$('.DashBoard .StopScanAll').click(function(e){
	$.ajax({
		url: web_server_url + '/scanner/stop_all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				//$("#inpGamerCount").prop('disabled', false);
				console.log('stop scan');
				//restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

$('.DashBoard .ClosePowerWall').click(function(e){
	$.ajax({
		url: web_server_url + '/game/close_power_wall',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				//$("#inpGamerCount").prop('disabled', false);
				console.log('stop scan');
				//restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

//кнопки для тестирования
$('.DashBoard .Test1').click(function(e){
	$.ajax({
		url: web_server_url + '/game/point1',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				//$("#inpGamerCount").prop('disabled', false);
				console.log('stop scan');
				//restart_timer();
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});



//-----------------------------------------------------------------------------
// Кнопки, эмулирующие двери
//-----------------------------------------------------------------------------
for (var i = 1; i < 8; i++) {
	// Кнопка открывающая дверь
	$('#Main .Door' + i + ' .Open').click(function(e){
		var name = $(e.srcElement).parents(".Device").find(".Input1")[0].name;
		$.ajax({
			url: web_server_url + '/' + name + '/open/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	});
	// Кнопка закрывающая дверь
	$('#Main .Door' + i + ' .Close').click(function(e){
		var name = $(e.srcElement).parents(".Device").find(".Input1")[0].name;
		$.ajax({
			url: web_server_url + '/' + name + '/close/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	});
}

//-----------------------------------------------------------------------------
// Кнопки, эмулирующие события аудиоплеера
//-----------------------------------------------------------------------------
for (var i = 1; i <= 5; i++) {
	// Кнопка окончания канала 1
	$('#Main .AudioPlayer' + i + ' .Stopped1').click(function(e){
		var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
		$.ajax({
			url: web_server_url + '/' + name + '/ch1_playback_finished/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	});
	// Кнопка окончания канала 2
	$('#Main .AudioPlayer' + i + ' .Stopped2').click(function(e){
		var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
		$.ajax({
			url: web_server_url + '/' + name + '/ch2_playback_finished/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	});
}

//-----------------------------------------------------------------------------
// Кнопки, эмулирующие события видеоплеера
//-----------------------------------------------------------------------------
for (var i = 1; i <= 4; i++) {
	// Кнопка окончания видео
	$('#Main .VideoPlayer' + i + ' .Stopped').click(function(e){
		var name = $(e.srcElement).parents(".Device").find(".Input3")[0].name;
		$.ajax({
			url: web_server_url + '/' + name + '/playback_finished/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	});
}

//-----------------------------------------------------------------------------
// Кнопки, эмулирующие кнопки
//-----------------------------------------------------------------------------
// Кнопка открывающая шкаф
$('#Main .Locker1Button .Push').click(function(e){
	$.ajax({
		url: web_server_url + '/locker_1_button/pushed/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

//-----------------------------------------------------------------------------
// Кнопки, эмулирующие устройства
//-----------------------------------------------------------------------------
// Кнопка 'Активировать многогранник
$('#Main .Polyhedron .On').click(function(e){
	$.ajax({
		url: web_server_url + '/polyhedron/activated/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack activated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'Деактивировать многогранник'
$('#Main .Polyhedron .Off').click(function(e){
	$.ajax({
		url: web_server_url + '/polyhedron/disconnected/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'Поставить многогранник'
$('#Main .Polyhedron .Stand').click(function(e){
	$.ajax({
		url: web_server_url + '/polyhedron/connected/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});


// Кнопка 'пристегнуть ремни'
$('#Main .SafetyBelts .On').click(function(e){
	$.ajax({
		url: web_server_url + '/safety_belts/number_of_fastened/10',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'отстегнуть ремни'
$('#Main .SafetyBelts .Off').click(function(e){
	$.ajax({
		url: web_server_url + '/safety_belts/number_of_fastened/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'вставить жетоны'
$('#Main .Figure .Insert').click(function(e){
	$.ajax({
		url: web_server_url + '/figure/number_of_inserted/10',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'получить карту'
$('#Main .CardHolder .Insert').click(function(e){
	$.ajax({
		url: web_server_url + '/card_holder/given/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'приложить карту'
$('#Main .CardReader .Ok').click(function(e){
	$.ajax({
		url: web_server_url + '/card_reader/card_ok/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'включить свет'
$('#Main .Light .On').click(function(e){
	$.ajax({
		url: web_server_url + '/light/on/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'выключить свет'
$('#Main .Light .Off').click(function(e){
	$.ajax({
		url: web_server_url + '/light/off/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'включить дым'
$('#Main .Smoke .On').click(function(e){
	$.ajax({
		url: web_server_url + '/smoke/on/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'выключить дым'
$('#Main .Smoke .Off').click(function(e){
	$.ajax({
		url: web_server_url + '/smoke/off/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'энергостена пройдена'
$('#Main .PowerWall .Ok').click(function(e){
	$.ajax({
		url: web_server_url + '/power_wall/power_ok/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('button pushed');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка спасения предпоследнего игрока
$('#Main .SaveButton .Push').click(function(e){
	//if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/save_button/pushed/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('button pushed');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	//}
});

//-----------------------------------------------------------------------------
// Кнопки, эмулирующие планшеты
//-----------------------------------------------------------------------------
// Кнопка 'Отправить' - для отправки кода на планшете1
$('#Main .Terminal1 .SendRight').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_1/code_entered/' + $("#inpTerminal1").val(),
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'Игра пройдена' - для прохождения игры на планшете2
$('#Main .Terminal2 .SendRight').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_2/game_passed/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'Игра не пройдена' - для прохождения игры на планшете2
$('#Main .Terminal2 .SendWrong').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_2/game_failed/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'Игра пройдена' - для прохождения игры на планшете3
$('#Main .Terminal3 .SendRight').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_3/game_passed/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
// Кнопка 'Игра не пройдена' - для прохождения игры на планшете3
$('#Main .Terminal3 .SendWrong').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_3/game_not_passed/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// Кнопка 'Отправить' - для отправки координат на планшете4
$('#Main .Terminal4 .SendRight').click(function(e){
	$.ajax({
		url: web_server_url + '/terminal_4/cooridnates_entered/' + $("#inpTerminal4").val(),
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('cell enter');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
//-----------------------------------------------------------------------------
// Кнопки, эмулирующие ячейки
//-----------------------------------------------------------------------------
// Кнопки 'Отправить' - для отправки значения ячейки, 'Закрыть', 'Открыть'
for (var i = 1; i <= 5; i++) {
	$('#Main .Cell' + i + ' .Send').click(function(e){
		var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
		$.ajax({
			url: web_server_url + '/' + element.name +'/code_entered/' +  element.value,
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('cell enter');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
			});
	});
	$('#Main .Cell' + i + ' .Open').click(function(e){
		var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
		$.ajax({
			url: web_server_url + '/' + element.name +'/open/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('cell enter');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
			});
	});
	$('#Main .Cell' + i + ' .Close').click(function(e){
		var element = $(e.srcElement).parents(".Device").find(".Input2")[0];
		$.ajax({
			url: web_server_url + '/' + element.name +'/close/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('cell enter');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
			});
	});
}

// Кнопки 'Активировать' и 'Деактивировать' - для моделирования подставки
$('#Main .PolyhedronRack .On').click(function(e){
	if ($("#inpLockerDoor").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/polyhedron_rack/activated/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('rack activated');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	}
});
$('#Main .PolyhedronRack .Off').click(function(e){
	if ($("#inpLockerDoor").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/polyhedron_rack/deactivated/0',
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('rack deactivated');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	}
});

// эмуляция пристёгивания ремней
$('#Main .Chairs .Fasten').click(function(e){
	$.ajax({
		url: web_server_url + '/chairs/fasten/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// эмуляция завершения видео на экранах
$('#Main .Screen1 .Stopped').click(function(e){
	$.ajax({
		url: web_server_url + '/screen1/stopped/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});
$('#Main .Screen2 .Stopped').click(function(e){
	$.ajax({
		url: web_server_url + '/screen2/stopped/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});

// эмуляция завершения аудио
$('#Main .AudioController .Stopped').click(function(e){
	$.ajax({
		url: web_server_url + '/audio_controller/stopped/0',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				console.log('rack deactivated');
			},
			error: function(error) {
				console.log('ERROR:', error);
			}
	});
});


// перезагрузка устройства
$('#Main .Device .Status').click(function(e){
	if (confirm("Подтвердите перезагрузку")){
		debugger;
		$.ajax({
			url: web_server_url + '/game/reload/' + e.srcElement.parentElement.children[1].children[1].name,
			type: "GET",
			crossDomain: true,
			dataType: "json",
				success: function (response) {
					console.log('reloaded');
				},
				error: function(error) {
					console.log('ERROR:', error);
				}
		});
	}
});