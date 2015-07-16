$(document).ready(function(){

	$('#btnAddDeviceType').on('click', addDeviceType);

	$('#btnAddDeviceCommand').on('click', addDeviceCommand);

	$('#btnCreateDeviceCommand').on('click', createDeviceCommand);

	$('#btnOpenCreateDeviceCommand').on('click', openCreateDeviceCommand);

});

function addDeviceCommand(event) {
	event.preventDefault();
}

function openCreateDeviceCommand(event) {
	event.preventDefault();

	$('#createDeviceCommand').show();
}

function createDeviceCommand(event) {
	event.preventDefault();
	// Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#createDeviceCommand input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newDeviceCommand = {
            'title': $('#createDeviceCommand fieldset input#inputDeviceCommandTitle').val(),
            'name': $('#createDeviceCommand fieldset input#inputDeviceCommandName').val(),
            'dname': $('#createDeviceCommand fieldset input#inputDeviceCommandDname').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newDeviceCommand,
            url: '/device_commands/create',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                window.location.replace("http://localhost:3000/device_types");

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
}

// Add User
function addDeviceType(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addDeviceType input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newDeviceType = {
            'title': $('#addDeviceType fieldset input#inputDeviceTypeTitle').val(),
            'name': $('#addDeviceType fieldset input#inputDeviceTypeName').val(),
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newDeviceType,
            url: '/device_types/add',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                window.location.replace("http://localhost:3000/device_types");

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};