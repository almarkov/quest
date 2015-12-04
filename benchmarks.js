
exports.function_usage_table = {}

exports.add  = function(module_function){
	if (exports.function_usage_table[module_function]) {
		exports.function_usage_table[module_function]  += 1;
	} else {
		exports.function_usage_table[module_function]  = 1;
	}
}

exports.get  = function(){
	return exports.function_usage_table;
}