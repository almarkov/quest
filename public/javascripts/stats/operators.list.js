$(document).ready(function(){

    populateOperatorsTable();

    $('#OperatorsList table tbody').on('click', 'td a.linkdelete', deleteOperator);

});

function populateOperatorsTable() {
    var tableContent = '';

    $.getJSON( '/api/operators/list', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';

            tableContent += '<td><a href="/operators/' + this._id +  '">' + this.name + '</a></td>'
            tableContent += '<td>' + this.name + '</td>';

            tableContent += '<td><a href="" class="linkdelete" rel="' + this._id + '">Удалить</a></td>'

            tableContent += '</tr>';
        });

        $('#OperatorsList table tbody').html(tableContent);
    });
}

function deleteOperator() {
    event.preventDefault();

    var id = $(this).attr('rel');

    $.ajax({
        type: 'GET',
        url: '/api/operators/' + id + '/delete',
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // window.location.replace("http://localhost:3000/device_types");
            alert('Данные сохранены');
            populateOperatorsTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

}

