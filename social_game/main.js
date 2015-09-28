function hide_element(id) {
    document.getElementById(id).style.display = 'none';
}

function change_face_left(name) {
	$('.face_block_left').hide();
	$('#face_' + name).show();
}