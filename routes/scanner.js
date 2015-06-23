var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка 'сканировать''
router.get('/start', function(req, res, next) {

	// if (gamers.quest_state > 110) {
 //    	gamers.quest_state -= 30; // 110 -> 80
 //    } 
    //gamers.quest_state += 1; //'Сканирование игрока №;

	// закрываем дверь №2
	var query = devices.build_query('door_2', 'close', '0');
	devices.get('door_2').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_2').mutex = 0;
			res.on('data', function(data){

				// запускаем таймер
				http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
						res.on('data', function(data){
							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices.get('timer').state = result.state.state;
						});
					}).on('error', function(e) {
						console.log("timer activate error: ");
				});
			});
		}).on('error', function(e) {
			devices.get('door_2').mutex = 0;
			console.log("door_2 closing error");
	});

	var result = {success: 1};
	res.json(result);
});

// нажата кнопка 'закончить сканирование''
router.get('/stop', function(req, res, next) {

	// если не предпоследний
	if (gamers.quest_state % 10 != gamers.count-2) {
		// гасим планшет
		var query = devices.build_query('terminal_1', "deactivate", "0");
		http.get(query, function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					devices.get('terminal_1').state = 'sleep';

			    });
			}).on('error', function(e) {
				console.log("Got error on pad activation  ");
		});

		// закрываем дверь №4
		var query = devices.build_query('door_4', 'close', '0');
		devices.get('door_4').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_4').mutex = 0;
				res.on('data', function(data){

					// запускаем таймер
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});

				});
			}).on('error', function(e) {
				devices.get('door_4').mutex = 0;
				console.log("door_4 close error: ");
		});

		var result = {success: 1};
		res.json(result);
	}
	// если предпоследний
	if (gamers.quest_state % 10 == gamers.count-2) {
		// закрываем дверь 3
		var query = devices.build_query('door_3', 'close', '0');
		devices.get('door_3').mutex = 1;
		http.get(query, function(res) {
				devices.get('door_3').mutex = 0;
				res.on('data', function(data){

					// запускаем таймер
					http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
							res.on('data', function(data){
								// пришёл ответ - актуализируем состояние таймера
								var result = JSON.parse(data);
								devices.get('timer').state = result.state.state;
							});
						}).on('error', function(e) {
							console.log("timer activate error: ");
					});

				});
			}).on('error', function(e) {
				devices.get('door_3').mutex = 0;
				console.log("door_3 close error: ");
		});

		var result = {success: 1};
		res.json(result);
	}


});


// нажата кнопка 'закончить поцедуру сканирование''
router.get('/stop_all', function(req, res, next) {

	gamers.quest_state = 142;//Все игроки снова собрались вместе и приглашаются во дворец благоденствия»

	// закрываем дверь 4
	var query = devices.build_query('door_4', 'close', '0');
	devices.get('door_4').mutex = 1;
	http.get(query, function(res) {
			devices.get('door_4').mutex = 0;
			res.on('data', function(data){

				// запускаем таймер
				http.get(devices.build_query('timer', 'activate', devices.default_timer_value), function(res) {
						res.on('data', function(data){
							// пришёл ответ - актуализируем состояние таймера
							var result = JSON.parse(data);
							devices.get('timer').state = result.state.state;
						});
					}).on('error', function(e) {
						console.log("timer activate error: ");
				});

			});
		}).on('error', function(e) {
			devices.get('door_4').mutex = 0;
			console.log("door_4 close error: ");
	});
	var result = {success: 1};
	res.json(result);
});

module.exports = router;