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
				// входная дверь
				if (response._entrance_door.state == "opened") {
					$("#inpEntranceDoor").val('Открыта');
				} else if (response._entrance_door.state == "closed") {
					$("#inpEntranceDoor").val('Закрыта');
				}

				// таймер
				$("#inpTimer").val(response._timer.current_value.toString());
				if (response._timer.state == "active") {
					$("#inpTimerState").val('Активен');
				} else if (response._timer.state == "ready") {
					$("#inpTimerState").val('Готов');
				} else if (response._timer.state == "idle") {
					$("#inpTimerState").val('Неактивен');
				}

				// дверь в комнату №2 
				if (response._room2_door.state == "opened") {
					$("#inpRoom2Door").val('Открыта');
				} else if (response._room2_door.state == "closed") {
					$("#inpRoom2Door").val('Закрыта');
				}

				// кнопка, открывающая шкаф

				// дверь шкафа
				if (response._locker_door.state == "opened") {
					$("#inpLockerDoor").val('Открыта');
				} else if (response._locker_door.state == "closed") {
					$("#inpLockerDoor").val('Закрыта');
				}

				// подставка многогранника
				if (response._polyhedron_rack.state == "active") {
					$("#inpPolyhedronRack").val('Активна');
				} else if (response._polyhedron_rack.state == "idle") {
					$("#inpPolyhedronRack").val('Не активна');
				}

				// свет
				if (response._light.state == "on") {
					$("#inpLight").val('Включён');
				} else if (response._light.state == "off") {
					$("#inpLight").val('Выключен');
				}

				// экран 1
				if (response._screen1.state == "playing") {
					$("#inpScreen1").val('Проигрывает');
				} else if (response._screen1.state == "stop") {
					$("#inpScreen1").val('Выключен');
				}

				// экран 2
				if (response._screen2.state == "playing") {
					$("#inpScreen2").val('Проигрывает');
				} else if (response._screen2.state == "stop") {
					$("#inpScreen2").val('Выключен');
				}

				// кресла
				if (response._chairs.state == "fasten") {
					$("#inpChairs").val('Ремни пристёгнуты');
				} else if (response._chairs.state == "not_fasten") {
					$("#inpChairs").val('Ремни не пристёгнуты');
				} else if (response._chairs.state == "vibrating") {
					$("#inpChairs").val('Вибрация');
				}

				// аудиоконтроллер
				if (response._audio_controller.state == "playing") {
					$("#inpAudioController").val('Проигрывает');
				} else if (response._audio_controller.state == "stop") {
					$("#inpAudioController").val('Выключен');
				}

				// дверь в комнату №3
				if (response._room3_door.state == "opened") {
					$("#inpRoom3Door").val('Открыта');
				} else if (response._room3_door.state == "closed") {
					$("#inpRoom3Door").val('Закрыта');
				}

				// дверь в комнату №4
				if (response._room4_door.state == "opened") {
					$("#inpRoom4Door").val('Открыта');
				} else if (response._room4_door.state == "closed") {
					$("#inpRoom4Door").val('Закрыта');
				}

				// дверь в комнату №5
				if (response._room5_door.state == "opened") {
					$("#inpRoom5Door").val('Открыта');
				} else if (response._room5_door.state == "closed") {
					$("#inpRoom5Door").val('Закрыта');
				}

				// дверь в комнату №6
				if (response._room6_door.state == "opened") {
					$("#inpRoom6Door").val('Открыта');
				} else if (response._room6_door.state == "closed") {
					$("#inpRoom6Door").val('Закрыта');
				}

				// дверь в комнату №7
				if (response._room7_door.state == "opened") {
					$("#inpRoom7Door").val('Открыта');
				} else if (response._room7_door.state == "closed") {
					$("#inpRoom7Door").val('Закрыта');
				}

				// планшет
				if (response._personal_code_pad.state == "active") {
					$("#inpPersonalCodePadState").val('Активен');
				} else if (response._personal_code_pad.state == "idle") {
					$("#inpPersonalCodePadState").val('Не активен');
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
// Инициализация игры
$('#Head .DashBoard .Start').click(function(e){
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

// Восстанавливаем в модели значения по умолчанию
$('#Head .DashBoard .Reset').click(function(e){
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

// Включить аудио 'В очередь'
$('#Head .DashBoard .Queue').click(function(e){
	$.ajax({
		url: web_server_url + '/audio_controller/play/0',
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
$('#Head .DashBoard .StartScan').click(function(e){
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

// Завершить сканирование
$('#Head .DashBoard .StopScan').click(function(e){
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

//-----------------------------------------------------------------------------
// Управление дверями
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// Кнопки, эмулирующие кнопки
//-----------------------------------------------------------------------------
// Кнопка открывающая шкаф
$('#Main .LockerButton .Push').click(function(e){
	if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/locker_button/pushed/0',
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
	}
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
// Кнопки, эмулирующие планшет
//-----------------------------------------------------------------------------
// Кнопка 'Отправить' - для отправки кода на планшете
$('#Main .PersonalCodePad .SendRight').click(function(e){
	//if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/personal_code_pad/entered_code/' + $("#inpPersonalCodePad").val(),
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
	//}
});
// Кнопка 'Отправить' - для отправки неверного кода на планшете
$('#Main .PersonalCodePad .SendWrong').click(function(e){
	//if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/personal_code_pad/code_enter_fail/' + $("#inpPersonalCodePad").val(),
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
	//}
});


//-----------------------------------------------------------------------------
// Кнопки, эмулирующие ячейки
//-----------------------------------------------------------------------------
// Кнопка 'Отправить' - для отправки значения ячейки
$('#Main .Cell1 .Send').click(function(e){
	//if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/cell1/enter/' + $("#inpCell1").val(),
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
	//}
});

// Кнопка 'Отправить' - для отправки значения ячейки
$('#Main .Cell2 .Send').click(function(e){
	//if ($("#inpRoom2Door").val() == 'Открыта') {
		$.ajax({
			url: web_server_url + '/cell2/enter/' + $("#inpCell2").val(),
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
	//}
});

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
