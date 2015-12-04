
exports.function_usage_table = {}

exports.add  = function(module_function){
	exports.function_usage_table[module_function] += 1;
}

exports.get  = function(module, function){
	return exports.function_usage_table;
}