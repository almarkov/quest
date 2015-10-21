$(document).ready(function(){

    populateGamesTable();

    $('#GamesList table tbody').on('click', 'td a.linkdelete', deleteGame);

});

function populateGamesTable() {
    var tableContent = '';

    $.getJSON( '/api/games/list', function( data ) {
        $.each(data, function(){
            tableContent += '<tr>';

            tableContent += '<td><a href="/stats/games/' + this._id +  '">' + this.dt_start + '</a></td>'
            tableContent += '<td>' + this.duration + '</td>';
            tableContent += '<td>' + this.operator.name + '</td>';

            tableContent += '<td><a href="" class="linkdelete" rel="' + this._id + '">Удалить</a></td>'

            tableContent += '</tr>';
        });

        $('#GamesList table tbody').html(tableContent);
    });
}

function deleteGame() {
    event.preventDefault();

    var id = $(this).attr('rel');

    $.ajax({
        type: 'GET',
        url: '/api/games/' + id + '/delete',
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // window.location.replace("http://localhost:3000/device_types");
            alert('Данные сохранены');
            populateGamesTable();

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            alert('Error: ' + response.msg);

        }
    });

}

