var m, s;

var prev_response = {};

function build_query(device, item, parameter) {
	return web_server_url
		+ "/game/emulate_command"
		+ '/' + device + '/'+ item + '/' + parameter;
}

$(document).ready(function() {

	shown = 0;

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

	for (var i = 1; i < 99999; i++) {
        window.clearInterval(i);
	}

	// проверяем состояние устройств
	setInterval(function(){
		$.ajax({
		url: web_server_url + (shown ? '/game/all_light' : '/game/all'),
		type: "GET",
		crossDomain: true,
		dataType: "json",
			success: function (response) {
				shown = 1
				$.each(response.devices, function(index, item){

					var value = '';
					if (item.state) {
						value = item.states[item.state].title;
					} else {
						value = '';
					}
					if (item.value) {
						value += item.value;
					}

					$('#inp_' + item.name + '_state').val(value);

					var element = $("[name=" + item.name + "_state]");
					var element_status = element.parent().parent().find(".Status");
					var status_class = item.state == 'undef' ? 'Offline'
										: item.wd_emulate ? 'Emulating' : 'Online';

					element_status.removeClass('Online Emulating Offline');
					element_status.addClass(status_class);

				});

				// обновляем кнопки
				$.each(response.face.dashboard_buttons, function( name, item ) {

					$("#btn_" + name).prop('disabled', item.disabled);

					$("#btn_" + name).removeClass('Active');
					if (item.highlight) {
						$("#btn_" + name).addClass('Active');
					}
				});

				// обновляем поля
				//if (response.face.dashboard_fields.length > 0) {
				//	console.log(response.face.dashboard_fields)
				//}
				$.each(response.face.dashboard_fields, function( name, item ) {

					if (item.type == 'text') {
						$(".State #" + item.id).prop('disabled', item.disabled);
					} else if (item.type == 'static') {
						var val = item.value;
						if (item.id == 'QuestTimer') {
							var t = item.value.split('\/');
							if (t.length == 2) {
								var r = t[1]-t[0];
								var m = ('0' + (r/60|0)).slice(-2);
								var s = ('0' + (r-m*60)).slice(-2);
								val = m + ':' + s;
							}
						}
						$("#" + item.id).text(val);
					} else if (item.type == 'select') {
						$("#" + item.id).prop('disabled', item.disabled);
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
	}, parseInt(web_ui_refresh_time));

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
			} else if (item.type == 'select') {
				raw_html += "<label for='" + item.id + "' class='Label1'>" + item.label + ": </label>"
							+ "<select name='" + item.name + "' item='" + item.value + "' id='" + item.id + "' class='Input1'>";
				var options = $.ajax({
					url: web_server_url + "/api/operators/list",
					type:       "GET",
					crossDomain: true,
					data:        {},
					async:       false,
					dataType:    "json",
					success:     function(){},
					error:       function(){},
				}).responseJSON;

				raw_html += "<option value='" + "-1" + "'>[Выберите опреатора]</option>";
				$.each(options, function(index, item){
					raw_html += "<option value='" + item._id + "'>" + item.name + "</option>";
				});
				raw_html += "</select>";
			}
			raw_html += "</li>";
		}
	});

	raw_html += "</ul>";

	return raw_html;
}

function generate_dashboard_top_section (section_name, data){

	var raw_html = "<ul class='DashBoard'>";

	$.each(data.face.dashboard_buttons, function(name, item) {
		if (item.section == section_name) {
			raw_html += "<li>"
					+ "<input type='button' id='btn_" + name + "' class='BType_01' value='" + item.title + "'>"
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

function generate_device (device) {
	var raw_html =    "<div class='Device'>"
					+     "<div class='Status Online' onclick=''>"
					+     "</div>"
					+     "<div class='Title'>"
					+         "<label for='inp_" + device.name + "' class='Label1'>" + device.title + "</label>"
					+     "</div>"
					+     "<div class='State'>"
					+         "<input type='text' name='" + device.name + "_state' value='' id='inp_" + device.name + "_state' class='Input1' disabled/>"
					+     "</div>"
					+     "<div class='InputField'>";
	if (device.has_value) {
		raw_html +=           "<input type='text' name='" + device.name + "' value='' id='inp_" + device.name + "' class='Input2' />";
	}
	raw_html +=           "</div>"
					+     "<div class='Commands'>"
					+         "<ul class='" + device.name + "'>";

	$.each(device.commands, function(command_name, item){
		if (item.has_button) {
			raw_html +=           "<li><a id='btn_cmd_" + device.name + "_" + command_name + "' class='BType_01'><span>" + item.title + "</span></a></li>";
		}
	});
	raw_html +=               "</ul>"
					+     "</div>"
					+     "<div class='Events'>"
					+         "<ul class='" + device.name + "'>";

	$.each(device.events, function(event_name, item){
		if (item.has_button) {
			raw_html +=           "<li><a id='btn_evt_" + device.name + "_" + event_name + "' class='BType_01'><span>" + item.title + "</span></a></li>";
		}
	});
	raw_html +=               "</ul>"
					+     "</div>"
					+ "</div>";
	return raw_html;
}

function generate_device_ (device) {
	var raw_html =    "<div class='Device'>"
					+     "<div class='Status Online' onclick=''>"
					+     "</div>"
					+     "<div class='State'>"
					+         "<label for='inp_" + device.name + "' class='Label1'>" + device.title + "</label>";
	if (device.has_value) {
		raw_html +=           "<input type='text' name='" + device.name + "' value='' id='inp_" + device.name + "' class='Input2' />";
	}
	raw_html +=               "<input type='text' name='" + device.name + "_state' value='' id='inp_" + device.name + "_state' class='Input1' disabled/>"
					+     "</div>"
					+     "<div class='Commands'>"
					+         "<ul class='" + device.name + "'>";

	$.each(device.commands, function(command_name, item){
		if (item.has_button) {
			raw_html +=           "<li><a id='btn_cmd_" + device.name + "_" + command_name + "' class='BType_01'><span>" + item.title + "</span></a></li>";
		}
	});
	$.each(device.events, function(event_name, item){
		if (item.has_button) {
			raw_html +=           "<li><a id='btn_evt_" + device.name + "_" + event_name + "' class='BType_01'><span>" + item.title + "</span></a></li>";
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
	$.each(data.face.dashboard_buttons, function(name, item){
		$("#btn_" + name).click(function(e){
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
			send_data.title = item.title;

			var success_cb = item.success_cb || default_success_cb;
			var success_cb_f = new Function('response', 'return ' + success_cb);

			var error_cb = item.error_cb || default_error_cb;
			var error_cb_f = new Function('error', 'return ' + error_cb);

			var ajax_url = item.ajax_url || '/game/dashboard_button_pushed';

			$.ajax({
				url: web_server_url + ajax_url,
				type: "GET",
				crossDomain: true,
				data: send_data,
				dataType: "json",
				success: success_cb_f(),
				error:   error_cb_f,
			});
		});
	});
	//-----------------------------------------------------------------------------
	// управление устройствами
	//-----------------------------------------------------------------------------

	// события и команды
	$.each(data.devices, function(device_index, device){
		$.each(device.commands, function(command_name, item){
			if (item.has_button) {
				$('#btn_cmd_' + device.name + '_' + command_name).click(function(e){

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
		$.each(device.events, function(event_name, item){
			if (item.has_button) {
				$('#btn_evt_' + device.name + '_' + event_name).click(function(e){

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
		var element = e.target.parentElement.children[1].children[1].name;
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