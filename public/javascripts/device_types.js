$(document).ready(function(){

	$('#btnOpenCreateDeviceType').on('click', openCreateDeviceType);

    $('#btnSaveDeviceType').on('click', saveDeviceType);

	$('#btnAddDeviceCommand').on('click', addDeviceCommand);

	$('#btnCreateDeviceCommand').on('click', createDeviceCommand);

	$('#btnOpenCreateDeviceCommand').on('click', openCreateDeviceCommand);

    //$('#deviceTypeList table tbody').on('click', 'td a.linkedit', editDeviceType);

    populateDeviceTypeTable();

    fillDeviceCommandList();

    //fillDeviceTypeDeviceCommandTable();
});

function openCreateDeviceType() {
    event.preventDefault();

    $('#createDeviceType').show();
}

function populateDeviceTypeTable() {
    var tableContent = '';

    $.getJSON( '/device_types/list', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';

            tableContent += '<td><a href="#" class="linkedit"  rel="' + this._id + '">' + this.title + '</a></td>'
            tableContent += '<td>' + this.name + '</td>';

            tableContent += '<td>';
            if (this.device_commands) {
                $.each(this.device_commands, function(){
                    tableContent += this.title + '  ' + this.name + '  ' + this.dname;
                    tableContent += '<br>';
                });
            }
            tableContent += '</td>';

            tableContent += '</tr>';
        });

        $('#deviceTypeList table tbody').html(tableContent);
    });
}

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

            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.username + '">' + this.username + '</a></td>';
                tableContent += '<td>' + this.email + '</td>';
                tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a></td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#userList table tbody').html(tableContent);
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

function saveDeviceType(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    // !!валидация
    var errorCount = 0;
    $('#deviceTypeForm input[type!=hidden]').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });
    var _id = $('#deviceTypeForm fieldset input#inputDeviceTypeId').val();

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newDeviceType = {
            'title': $('#deviceTypeForm fieldset input#inputDeviceTypeTitle').val(),
            'name': $('#deviceTypeForm fieldset input#inputDeviceTypeName').val(),
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
                    populateDeviceTypeTable();

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

                    alert('Данные сохранены');
                    $('#deviceTypeForm fieldset input#inputDeviceTypeId').val(response.new_id);
                    populateDeviceTypeTable();

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