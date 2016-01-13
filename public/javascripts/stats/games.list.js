$(document).ready(function(){
    populateGamesTable();

    $('#GamesList table tbody').on('click', 'td a.linkdelete', deleteGame);

});

// дата в формате 'yyyy-mm-dd HH:MM:SS'
function ymdhms_date(date) {
    //benchmarks.add('routinesjs_ymdhms_date')
    var dt = new Date(date) || new Date()
    dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
    return dt.getFullYear()
        + '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
        + '-' + ('0' + dt.getDate()).slice(-2)
        + ' ' + ('0' + dt.getHours()).slice(-2)
        + ':' + ('0' + dt.getMinutes()).slice(-2)
}

function populateGamesTable() {
    var tableContent = '';
    var pagerContent = '';
    var i = 1;
    var j = 0;
    var query = ''
    if (operator_id) {
        query += '?operator_id=' + operator_id
    }

    $.getJSON( '/api/games/list' + query, function( data ) {
        $.each(data, function(){
            if (j == 0) {
                pagerContent += '<li class="' + (i == page ? 'pagination_page_active' :  'pagination_page') + '"><a href="/stats/games?page=' + i + '&count=' + count + '">' + i + '</a></li>'
            }
            if (i == page) {
                tableContent += '<tr>';

                tableContent += '<td><a href="/stats/games/' + this._id +  '">' + ymdhms_date(this.dt_start) + '</a></td>'
                tableContent += '<td>' + (this.duration/60 | 0) + ':' + this.duration%60 + '</td>';
                tableContent += '<td>' + this.operator.name + '</td>';

                tableContent += '<td><a href="" class="linkdelete" rel="' + this._id + '">Удалить</a></td>'

                tableContent += '</tr>';
            }
            j++;
            if (j == count) {
                i += 1;
                j = 0;
            }
        });

        $('#GamesList table tbody').html(tableContent);
        $('#Pager ul').html(pagerContent);
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

