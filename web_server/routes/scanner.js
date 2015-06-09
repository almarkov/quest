var express = require('express');
var router = express.Router();
var http   = require('http');

// нажата кнопка 'сканировать''
router.get('/start', function(req, res, next) {
console.log(gamers.quest_state);
console.log(gamers.count);

	if (gamers.quest_state > 110) {
    	gamers.quest_state -= 30; // 110 -> 80
    } 
    gamers.quest_state += 1; //'Сканирование игрока №;

	// закрываем дверь №3
	http.get(devices._room3_door.url + "/room3_door/close", function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				// пришёл ответ  - актуализируем состояние двери
		        var result = JSON.parse(data);
		        devices._room3_door.state = result.state.state;

		        // пробуждаем планшет
		        http.get(devices._personal_code_pad.url + "/personal_code_pad/activate", function(res) {
						console.log("Got response: " );
						res.on('data', function(data){

							// пришёл ответ  - актуализируем состояние планшета
					        var result = JSON.parse(data);
					        devices._personal_code_pad.state = result.state.state;

					        gamers.quest_state += 10;//'Игрок № вводит код 80->90

					    });
					}).on('error', function(e) {
						console.log("Got error on pad activation  ");
				});
		  //       // запускаем таймер на 10 секунд
				// http.get(devices._timer.url + "/timer/activate/10", function(res) {
				// 		console.log("Got response on timer activation" );
				// 		res.on('data', function(data){

				// 			// пришёл ответ - актуализируем состояние таймера
				// 			var result = JSON.parse(data);
				// 			devices._timer.state = result.state.state;

				// 			gamers.quest_state += 10;//'Сканирование игрока №, идёт сканирование' 80->90

				// 		});
				// 	}).on('error', function(e) {
				// 		console.log("timer activation error: ");
				// });

		    });
		}).on('error', function(e) {
			console.log("Got error: ");
	});

	var result = {success: 1};
	res.json(result);
});

// нажата кнопка 'закончить сканирование''
router.get('/stop', function(req, res, next) {

	// гасим планшет
    http.get(devices._personal_code_pad.url + "/personal_code_pad/deactivate", function(res) {
			console.log("Got response: " );
			res.on('data', function(data){

				// пришёл ответ  - актуализируем состояние планшета
		        var result = JSON.parse(data);
		        devices._personal_code_pad.state = result.state.state;

		    });
		}).on('error', function(e) {
			console.log("Got error on pad deactivation  ");
	});

	// если не предпоследний
	if (gamers.quest_state % 10 != gamers.count-1) {
		// закрываем дверь №4
		http.get(devices._room4_door.url + "/room4_door/close", function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					// пришёл ответ  - актуализируем состояние двери
			        var result = JSON.parse(data);
			        devices._room4_door.state = result.state.state;

			        gamers.quest_state += 10; // Осталось просканировать 100 ->110;

			        // если не последний 
			        if (gamers.quest_state % 10 != gamers.count) {
				        // открытие двери №3
				        http.get(devices._room3_door.url + "/room3_door/open", function(res) {
								console.log("Got response: " );
								res.on('data', function(data){

									// пришёл ответ  - актуализируем состояние двери
							        var result = JSON.parse(data);
							        devices._room3_door.state = result.state.state;


							    });
							}).on('error', function(e) {
								console.log("Got error on door3 opening ");
						});
					// если последний
					} else {
						console.log('gotcha');
						gamers.quest_state = 120; // Спасение предпоследнего игрока
					}

			    });
			}).on('error', function(e) {
				console.log("Got errorclosing door 4 ");
		});

		var result = {success: 1};
		res.json(result);
	}
	// если предпоследний
	if (gamers.quest_state % 10 == gamers.count-1) {
		// закрываем дверь №5
		http.get(devices._room5_door.url + "/room5_door/close", function(res) {
				console.log("Got response: " );
				res.on('data', function(data){

					// пришёл ответ  - актуализируем состояние двери
			        var result = JSON.parse(data);
			        devices._room5_door.state = result.state.state;

			        gamers.quest_state += 10; // Осталось просканировать 100 ->110;

			        // открытие двери №3
			        http.get(devices._room3_door.url + "/room3_door/open", function(res) {
							console.log("Got response: " );
							res.on('data', function(data){

								// пришёл ответ  - актуализируем состояние двери
						        var result = JSON.parse(data);
						        devices._room3_door.state = result.state.state;


						    });
						}).on('error', function(e) {
							console.log("Got error on door3 opening  ");
					});
			    });
			}).on('error', function(e) {
				console.log("Got error on door5 closing : ");
		});

		var result = {success: 1};
		res.json(result);
	}


});

module.exports = router;