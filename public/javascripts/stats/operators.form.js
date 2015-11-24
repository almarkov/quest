$(document).ready(function(){

	// типы устройств
	$('#btnSaveOperator').on('click', saveOperator);
	$('#btnBackOperator').on('click', backOperator);

	fillOperatorForm();
});

function fillOperatorForm(fields) {

	var id = $('#OperatorForm fieldset input#inputOperatorId').val();
	// изменение
	if (id) {
		$.getJSON( '/api/operators/' + id, function( data ) {
			$("#inputOperatorId").val(data._id);
			$("#inputOperatorName").val(data.name);
		});
	// создание
	} else {
		$("#inputOperatorId").val('');
		$("#inputOperatorName").val('');
	}
}

function saveOperator(event) {
	event.preventDefault();

	// Super basic validation - increase errorCount variable if any fields are blank
	// !!валидация
	var errorCount = 0;
	$('#OperatorForm input[type!=hidden]').each(function(index, val) {
		if($(this).val() === '') { errorCount++; }
	});
	var _id = $('#OperatorForm fieldset input#inputOperatorId').val();

	// Check and make sure errorCount's still at zero
	if(errorCount === 0) {

		// If it is, compile all user info into one object
		var newOperator = {
			'name': $('#OperatorForm fieldset input#inputOperatorName').val(),
		};

		// обновляем
		if (_id) {
			 // Use AJAX to post the object to our adduser service
			$.ajax({
				type: 'POST',
				data: newOperator,
				url: '/api/operators/' + _id,
				dataType: 'JSON'
			}).done(function( response ) {

				// Check for successful (blank) response
				if (response.msg === '') {

					// window.location.replace("http://localhost:3000/device_types");
					alert('Данные сохранены');
					window.location = "/stats/operators";

				}
				else {

					// If something goes wrong, alert the error message that our service returned
					alert('Error: ' + response.msg);

				}
			});

		// создаём
		} else {
			// Use AJAX to post the object to our adduser service
			$.ajax({
				type: 'POST',
				data: newOperator,
				url: '/api/operators/create',
				dataType: 'JSON'
			}).done(function( response ) {

				// Check for successful (blank) response
				if (response.msg === '') {

					alert('Данные сохранены');
					$('#OperatorForm fieldset input#inputOperatorId').val(response.new_id);
                    window.location = "/stats/operators";

				}
				else {

					// If something goes wrong, alert the error message that our service returned
					alert('Error: ' + response.msg);

				}
			});
		}

	}
	else {
		// If errorCount is more than 0, error out
		alert('Please fill in all fields');
		return false;
	}
};

function backOperator() {
	window.location = "/stats/operators";
}