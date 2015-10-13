var xlsx = require('node-xlsx');

exports.load = function() {
	var obj = xlsx.parse('logic.xlsx');
	var data = obj[0].data;

}