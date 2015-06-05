// адрес МК - может  быть несколько

// надо прописать для каждого
// надо сделать, чтобы адрес устройства вычисляся так:
// url = "http://<ip>:<port>" || "<url>", т.е. можно указать либо ip+port, либо url
exports.dev_url = "http://localhost:3030";

// входная дверь
exports._entrance_door   = {id:  1, url: exports.dev_url, ip: "", port: "", state: "opened"}; // events:, actions: open|close|state
// таймер
exports._timer           = {id:  2, url: exports.dev_url, ip: "", port: "", state: "idle", value: 5, current_value: "" }; // events: ready
// дверь в комнату №2
exports._room2_door      = {id:  3, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// кнопка, открывающая шкаф
exports._locker_button   = {id:  4, url: exports.dev_url, ip: "", port: "", state: "idle"};  // events: pushed
// дверь шкафа
exports._locker_door     = {id:  5, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// подставка многогранника 
exports._polyhedron_rack = {id:  6, url: exports.dev_url, ip: "", port: "", state: "idle"}; // events: activated
// свет
exports._light           = {id:  7, url: exports.dev_url, ip: "", port: "", state: "on"};   // passive
// дверь в комнату №3
exports._room3_door      = {id:  8, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// дверь в комнату №4
exports._room4_door      = {id:  9, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// дверь в комнату №5
exports._room5_door      = {id: 10, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// кнопка спасения игрока
exports._save_button     = {id: 11, url: exports.dev_url, ip: "", port: "", state: "idle"};  // events: pushed
// дверь в комнату №6
exports._room6_door      = {id: 12, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
// ячейка №1
exports._cell1           = {id: 13, url: exports.dev_url, ip: "", port: "", state: "closed"}; // events: code_entered
// ячейка №2
exports._cell2           = {id: 14, url: exports.dev_url, ip: "", port: "", state: "closed"}; // events: code_entered
// дверь в комнату №7
exports._room7_door      = {id: 15, url: exports.dev_url, ip: "", port: "", state: "closed"}; // passive
