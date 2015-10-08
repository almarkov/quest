$(document).ready(function(){

    populateOperatorsTable();

    $('#OperatorsList table tbody').on('click', 'td a.linkdelete', deleteOperator);

});

function populateOperatorsTable() {
    var tableContent = '';

    $.getJSON( '/api/v1/device_types/', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';

            tableContent += '<td><a href="/device_type/' + this._id +  '">' + this.title + '</a></td>'
            tableContent += '<td>' + this.name + '</td>';

            tableContent += '<td>';
            if (this.device_commands) {
                $.each(this.device_commands, function(){
                    tableContent += this.title + '  ' + this.name + '  ' + this.dname;
                    tableContent += '<br>';
                });
            }
            tableContent += '</td>';

            tableContent += '<td>';
            if (this.device_events) {
                $.each(this.device_events, function(){
                    tableContent += this.title + '  ' + this.name + '  ' + this.dname;
                    tableContent += '<br>';
                });
            }
            tableContent += '</td>';

            tableContent += '<td>';
            if (this.device_states) {
                $.each(this.device_states, function(){
                    tableContent += this.title + '  ' + this.name + '  ' + this.dname;
                    tableContent += '<br>';
                });
            }
            tableContent += '</td>';

            tableContent += '<td><a href="" class="linkdelete" rel="' + this._id + '">Удалить</a></td>'

            tableContent += '</tr>';
        });

        $('#deviceTypeList table tbody').html(tableContent);
    });
}

function deleteOperator() {
    event.preventDefault();

    var id = $(this).attr('rel');

    $.ajax({
        type: 'DELETE',
        url: '/api/v1/device_types/' + id,
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

}

