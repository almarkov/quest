$(document).ready(function(){

	$('#btnAddDeviceType').on('click', addDeviceType);

	$('#btnAddDeviceCommand').on('click', addDeviceCommand);

	$('#btnCreateDeviceCommand').on('click', createDeviceCommand);

	$('#btnOpenCreateDeviceCommand').on('click', openCreateDeviceCommand);

    fillDeviceCommandList();

    //fillDeviceTypeDeviceCommandTable();
});

function fillDeviceCommandList() {
    var deviceCommandListOptionsContent = '';

    $.getJSON( '/device_commands/list', function( data ) {

        deviceCommandListOptionsContent += '<option value="-1">[Выберите команду]</option>';
        $.each(data, function(){
            deviceCommandListOptionsContent += '<option value=' + this._id + '>';
            deviceCommandListOptionsContent += this.title + '   ' + this.name + '   ' + this.dname;
            deviceCommandListOptionsContent += '</option>';
        });

        $('#inputDeviceCommand').html(deviceCommandListOptionsContent);
    });
}

function fillDeviceTypeDeviceCommandTable() {
    var deviceTypeDeviceCommandTable = '';

    var _id = $('#addDeviceType fieldset input#inputDeviceTypeId').val();

    if (_id) {

        $.getJSON( '/device_types/' + _id + '/device_commands/list', function( data ) {

            // deviceCommandListOptionsContent += '<option value="-1">[Выберите команду]</option>';
            // $.each(data, function(){
            //     deviceCommandListOptionsContent += '<option value=' + this._id + '>';
            //     deviceCommandListOptionsContent += this.title + '   ' + this.name + '   ' + this.dname;
            //     deviceCommandListOptionsContent += '</option>';
            // });

            // $('#inputDeviceCommand').html(deviceCommandListOptionsContent);
        });
    }
}

function addDeviceCommand(event) {
    event.preventDefault();
    // если есть _id - просто добавляем
    // иначе         - создаём устройство, потом
    var _id = $('#addDeviceType fieldset input#inputDeviceTypeId').val();
    debugger;
    var command_id = $('#inputDeviceCommand').val();
    if (command_id != "-1") {
        if (_id) {
            // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: {'command_id': command_id},
                url: '/device_types/' + _id + '/device_commands/add',
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {
                    $('#createDeviceCommand fieldset input').val('');
                    $('#createDeviceCommand').hide();
                    fillDeviceCommandList();
                    //window.location.replace("http://localhost:3000/device_types");

                }
                else {

                    // If something goes wrong, alert the error message that our service returned
                    alert('Error: ' + response.msg);

                }
            });
        }        
    }
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
            url: '/device_commands/add',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {
                $('#createDeviceCommand fieldset input').val('');
                $('#createDeviceCommand').hide();
                fillDeviceCommandList();
                //window.location.replace("http://localhost:3000/device_types");

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
    // !!валидация
    var errorCount = 0;
    $('#addDeviceType input[type!=hidden]').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    var _id = $('#addDeviceType fieldset input#inputDeviceTypeId').val();

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newDeviceType = {
            'title': $('#addDeviceType fieldset input#inputDeviceTypeTitle').val(),
            'name': $('#addDeviceType fieldset input#inputDeviceTypeName').val(),
        };

        // обновляем
        if (_id) {
             // Use AJAX to post the object to our adduser service
            $.ajax({
                type: 'POST',
                data: newDeviceType,
                url: '/device_types/' + _id,
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // window.location.replace("http://localhost:3000/device_types");
                    alert('Данные сохранены');

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
                data: newDeviceType,
                url: '/device_types/create',
                dataType: 'JSON'
            }).done(function( response ) {

                // Check for successful (blank) response
                if (response.msg === '') {

                    // window.location.replace("http://localhost:3000/device_types");
                    alert('Данные сохранены');

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