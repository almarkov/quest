var web_server_url   = "http://localhost:3000";

var start_time;
var m, s;

var external_config;
var config_list = [];
var prev_response = {};
$.ajax({
	url: web_server_url + '/game/config',
	type: "GET",
	crossDomain: true,
	dataType: "json",
		success: function (response) {
			external_config = response;
		},
		error: function(error) {
		}
});

function build_query(device, item, parameter) {
	return web_server_url
		+ "/game/emulate_item"
		+ '/' + device + '/'+ item + '/' + parameter;
}

function disable_gamer_count() {
	$("#inpGamerCount").prop('disabled', true);
}

function enable_gamer_count() {
	$("#inpGamerCount").prop('disabled', false);
	$("#inpGamerCount").val('');
}

// function restart_timer () {
// 	// получаем дату старта для таймера игры
// 	start_time = null;
// 	var now = new Date();
// 	$.ajax({
// 		url: web_server_url + '/game/start_time',
// 		type: "GET",
// 		crossDomain: true,
// 		dataType: "json",
// 		success: function (response) {
// 			if (response.date) {
// 				start_time = new Date(response.date);
// 				var diff = start_time - now + 60*60*1000 ;
// 				var ms = diff % 1000;
// 				s  = ((diff - ms)/1000) % 60;
// 				m  = ((diff - ms - s* 1000)/60000) % 60;

// 				//таймер квеста(1час)
// 				game_timer = setInterval(function () {
// 					s = s - 1;
// 					if (s == -1) {
// 						m = m-1;
// 						s = 59;
// 					}
// 					if (start_time) {
// 						if (m < 0) {
// 							//$("#QuestTimer").text('Время вышло. Квест провален');
// 						} else {
// 							//$("#QuestTimer").text(parseInt(m) + ':' + parseInt(s));
// 						}
// 					} else {
// 						//$("#QuestTimer").text('NA');
// 					}
// 				}, 1000);

// 				disable_gamer_count();
// 			} else {

// 				stop_timer();
// 				enable_gamer_count();
// 				//$("#QuestTimer").text('NA');
// 				return;
// 			}
// 		},
// 		error: function(error) {
// 		}
// 	});

	
// }

$(document).ready(function() {

	$.ajax({
		url: web_server_url + '/game/all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				var content_top = generate_content_top(response);
				$('#Content').prepend(content_top);
				var content_main = generate_content_main(response);
				$('#Content').append(content_main);
				set_handlers(response);
			},
			error: function(error) {
			}
	});

	if (!start_time) {
		//restart_timer();
	}
	for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
	}

	// проверяем состояние устройств
	setInterval(function(){
		$.ajax({
		url: web_server_url + '/game/all',
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {

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

				$.each(response.devices, function(index, item){

					var value = '';
					if (item.state) {
						value = item.states[item.state].title;
					} else {
						value = '';
					}
					if (item.value) {
						if (item.type == 'cell') {
							value += codes[item.value];
						} else {
							value += item.value;
						}
					}

					$('#inp_' + item.name + '_state').val(value);

					var element = $("[name=" + item.name + "_state]");
					var element_status = element.parent().parent().find(".Status");
					var status_class = item.wd_state == 0 ? 'Offline'
										: item.wd_emulate ? 'Emulating' : 'Online';

					element_status.removeClass('Online Emulating Offline');
					element_status.addClass(status_class);

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

function generate_content_main(data) {
	var raw_html = "<div id='Main'>";

	$.each([ 1, 2, 3, 4 ], function(index, item) {
		raw_html += generate_main_column(item, data);
	});

	raw_html += "</div>";
	return raw_html;
}

function generate_main_column(column, data) {
	var raw_html = "<div id='col" + column + "'>";

	$.each(data.devices, function(index, item){
		if (item.position.column == column) {
			raw_html += generate_device(item);
		}
	});

	raw_html += "</div>";
	return raw_html;
}

function generate_device (data) {
	var raw_html =    "<div class='Device'>"
					+     "<div class='Status Online' onclick=''>"
					+     "</div>"
					+     "<div class='State'>"
					+         "<label for='inp_" + data.name + "' class='Label1'>" + data.title + "</label>";
	if (data.has_value) {
		raw_html +=           "<input type='text' name='" + data.name + "' value='' id='inp_" + data.name + "' class='Input2' />";
	}
	raw_html +=               "<input type='text' name='" + data.name + "_state' value='' id='inp_" + data.name + "_state' class='Input1' disabled/>"
					+     "</div>"
					+     "<div class='Commands'>"
					+         "<ul class='" + data.name + "'>";

	$.each(data.commands, function(index, item){
		if (item.has_button) {
			raw_html +=           "<li><a class='" + item.name + " BType_01'><span>" + item.title + "</span></a></li>";
		}
	});
	$.each(data.events, function(index, item){
		if (item.has_button) {
			raw_html +=           "<li><a class='" + item.name + " BType_01'><span>" + item.title + "</span></a></li>";
		}
	});
	raw_html +=               "</ul>"
					+     "</div>"
					+ "</div>";
	return raw_html;
}

function set_handlers(data) {

	var default_success_cb = 'function (response) {}';
	var default_error_cb   = 'function(error) {}';

	//-----------------------------------------------------------------------------
	// Управление игрой
	//-----------------------------------------------------------------------------
	$.each(data.face.dashboard_buttons, function(index, item){
		$('.DashBoard .' + item.style_class).click(function(e){
			if (item.confirm && !confirm("Подтвердите действие")){
				return;
			}
			var send_data = {}
			if (item.validate_cb) {
				var validate_f = new Function('return ' + item.validate_cb)();
				var validate_res = validate_f();
				if (!validate_res.ok) {
					return;
				} else {
					send_data = validate_res.params;
				}
			}

			var success_cb = item.success_cb || default_success_cb;
			var success_cb_f = new Function('response', 'return ' + success_cb);

			var error_cb = item.error_cb || default_error_cb;
			var error_cb_f = new Function('error', 'return ' + error_cb);

			$.ajax({
				url: web_server_url + item.ajax_url,
				type: "GET",
				crossDomain: true,
				data: send_data,
				dataType: "json",
				success: success_cb_f,
				error:   error_cb_f,
			});
		});
	});
	//-----------------------------------------------------------------------------
	// управление устройствами
	//-----------------------------------------------------------------------------

	// события и команды
	$.each(data.devices, function(device_index, device){
		$.each(device.commands, function(item_index, item){
			if (item.has_button) {
				$('.Device .Commands .' + device.name + ' .' + item.name).click(function(e){

					if (item.button.confirm && !confirm("Подтвердите действие")){
						return;
					}

					var parameter = item.button.parameter || $("#inp_" + device.name).val() || '0';
					var query = item.button.query || build_query(device.name, item.name, parameter);

					var success_cb = item.button.success_cb || default_success_cb;
					var success_cb_f = new Function('response', 'return ' + success_cb);

					var error_cb = item.button.error_cb || default_error_cb;
					var error_cb_f = new Function('error', 'return ' + error_cb);

					$.ajax({
						url: query,
						type: "GET",
						crossDomain: true,
						dataType: "json",
						success: success_cb_f,
						error: error_cb_f,
					});
				});
			}
		});
		$.each(device.events, function(item_index, item){
			if (item.has_button) {
				$('.Device .Commands .' + device.name + ' .' + item.name).click(function(e){

					if (item.button.confirm && !confirm("Подтвердите действие")){
						return;
					}

					var parameter = item.button.parameter || $("#inp_" + device.name).val() || '0';
					var query = item.button.query || build_query(device.name, item.name, parameter);

					var success_cb = item.button.success_cb || default_success_cb;
					var success_cb_f = new Function('response', 'return ' + success_cb);

					var error_cb = item.button.error_cb || default_error_cb;
					var error_cb_f = new Function('error', 'return ' + error_cb);

					$.ajax({
						url: query,
						type: "GET",
						crossDomain: true,
						dataType: "json",
						success: success_cb_f,
						error: error_cb_f,
					});
				});
			}
		});
	});

	

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