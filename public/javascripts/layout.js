$(document).ready(function(){

	// типы устройств
	$('#Logout').on('click', logout);


});

function logout (event) {
	
	$.ajax({
		type: 'GET',
		url: '/api/auth/logout',
		dataType: 'JSON'
	}).done(function( response ) {

		// window.location.replace("http://localhost:3000/device_types");
		window.location = "/";
	});
}