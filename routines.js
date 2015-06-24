exports.ymd_date = function(date) {
	var dt = date || new Date();
  	dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1);
	return dt.getFullYear()
		+ '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
		+ '-' + ('0' + dt.getDate()).slice(-2);

}

exports.ymdhms_date = function(date) {
	var dt = date || new Date();
	dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1);
	return dt.getFullYear()
		+ '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
		+ '-' + ('0' + dt.getDate()).slice(-2)
		+ ' ' + ('0' + dt.getHours()).slice(-2)
		+ ':' + ('0' + dt.getMinutes()).slice(-2)
		+ ':' + ('0' + dt.getSeconds()).slice(-2);
}