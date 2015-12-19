$(document).ready(function(){

	$('#btnCommitLogin').on('click', commitLogin);

});

function commitLogin (event) {

	var login_data = {
		'password': $('#inputPassword').val(),
	}

	$.ajax({
		type: 'POST',
		data: login_data,
		url: '/api/auth/login',
		dataType: 'JSON'
	}).done(function( response ) {

		// Check for successful (blank) response
		if (response.msg === '') {

			// window.location.replace("http://localhost:3000/device_types");
			window.location = "/stats/";

		}
		else {

			// If something goes wrong, alert the error message that our service returned
			alert(response.msg);

		}
	});
}