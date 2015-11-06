// поиск в объекте вида
// object = {
// 	name1: {
// 		field1: value1,
// 		field2: value2,
// 	}
// 	name2: {
// 		field1: value3,
// 		field2: value4,
// 	}
// };
// get_by_field(object, field1, value3) вернёт 
// 	name2: {
// 		field1: value3,
// 		field2: value4,
// 	}
exports.get_by_field = function(object, field, value) {
	for (var item in object) {
		if (object[item][field] == value) {
			return object[item]
		}
	}
	return null
}

// дата в формате 'yyyy-mm-dd'
exports.ymd_date = function(date) {
	var dt = date || new Date()
	dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
	return dt.getFullYear()
		+ '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
		+ '-' + ('0' + dt.getDate()).slice(-2)
}

// дата в формате 'yyyy-mm-dd HH:MM:SS'
exports.ymdhms_date = function(date) {
	var dt = date || new Date()
	dt = new Date(dt.getTime() + (dt.getTimezoneOffset() / 60) * -1)
	return dt.getFullYear()
		+ '-' + ('0' + (dt.getMonth() + 1)).slice(-2)
		+ '-' + ('0' + dt.getDate()).slice(-2)
		+ ' ' + ('0' + dt.getHours()).slice(-2)
		+ ':' + ('0' + dt.getMinutes()).slice(-2)
		+ ':' + ('0' + dt.getSeconds()).slice(-2)
}

// поверхностное объектов
exports.simple_copy_obj = function(obj) {
	var new_obj = {}
	for (var k in obj) {
		new_obj[k] = obj[k]
	}
	return new_obj
}

// глубокое копирование
exports.deep_copy_obj = function (obj) {
    if (typeof obj != "object") {
        return obj
    }
    var copy = {}
    for (var key in obj) {
        if (typeof obj[key] == "object") {
            copy[key] = this.deep_copy_obj(obj[key])
        } else {
            copy[key] = obj[key]
        }
    }
    return copy
}

