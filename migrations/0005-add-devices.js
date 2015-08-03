
var mongodb = require('mongodb');

exports.up = function(db, next){
    var device_types = db.collection("device_types");
    device_types.insert({title: 'Дверь', name: 'door'}, next);
};

exports.down = function(db, next){
    var device_types = db.collection("device_types");
    device_types.remove({}, {}, next);
};
