exports.count = 0;

exports.quest_states = [
	'Проверка исправности всех устройств',             // 0
	'Все устроства работают нормально',                // 1
	'Все устроства работают нормально',                // 2
	'Идёт обслуживание',                               // 3
	'',
	'Квест готов к запуску',                           // 5
	'','','','',
	'Начало квеста',                                   // 10
	'','','','',
	'Ожидание открытия двери 1',                       // 15
	'Ожидание, пока все игроки войдут внутрь. Требуется действие оператора. Когда все игроки войдут – нажмите кнопку «Все игроки зашли внутрь»', //16
	'','','',
	'Ожидание закрытия двери 1',                       // 20
	'','','','','','','','','',
	'Ожидание открытия двери 2',                       // 30
	'','','','','','','','','',
	'Поиск кнопки, открывающей шкаф с многогранником', // 40
	'','','','',
	'Ожидание, пока игроки поставят многогранник на подставку', // 45,
	'','','','',
	'Ожидание, пока игроки активируют многогранник',   // 50
	'','','','','','','','','',
	'Подготовка к перелёту',                           // 60
	'','','','','','','','','',
	'Перелёт',                                         // 70
	'','','','',
	'Прилетели',                                       // 75
	'','','','',
	'Стыковка',                                        // 80
	'','','','',
	'Стыковка',                                        // 85 - фиктивный(коничилось либо аудио, либо видео)
	'','','','',
	'Стыковка',                                        // 90
	'','','','','','','','','',
	'Приглашение на сканирование',                     // 100
	'Приглашение на сканирование',                     // 101
	'Приглашение на сканирование',                     // 102
	'Приглашение на сканирование',                     // 103
	'Приглашение на сканирование',                     // 104
	'Приглашение на сканирование',                     // 105
	'Приглашение на сканирование',                     // 106
	'Приглашение на сканирование',                     // 107
	'Приглашение на сканирование',                     // 108
	'Приглашение на сканирование',                     // 109
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 110
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 111
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 112
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 113
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 114
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 115
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 116
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 117
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 118
	'Требуется действие оператора. Убедитесь, что в комнате сканирования только один человек, и нажмите «Сканировать». Осталось просканировать ',                          // 119
	'Идет сканирование игрока ',                       // 120
	'Идет сканирование игрока ',                       // 121
	'Идет сканирование игрока ',                       // 122
	'Идет сканирование игрока ',                       // 123
	'Идет сканирование игрока ',                       // 124
	'Идет сканирование игрока ',                       // 125
	'Идет сканирование игрока ',                       // 126
	'Идет сканирование игрока ',                       // 127
	'Идет сканирование игрока ',                       // 128
	'Идет сканирование игрока ',                       // 129
	'Игрок №1 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 130
	'Игрок №2 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 131
	'Игрок №3 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 132
	'Игрок №4 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 133
	'Игрок №5 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 134
	'Игрок №6 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 135
	'Игрок №7 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 136
	'Игрок №8 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 137
	'Игрок №9 прошёл сканирование, после перехода Нажмите «Закончить сканирование»', // 138
	'',                                                // 139
	'Сканирование закончено. Игроки должны спасти коллегу, попавшего в комнату аннигиляции.',      // 140
	'Сканирование закончено. Игроки должны спасти коллегу, попавшего в комнату аннигиляции.',      // 141
	'Все игроки снова собрались вместе, и вот-вот попадут во дворец благоденствия',                // 142
	'Осталось просканировать',                         // 143
	'Осталось просканировать',                         // 144
	'Все игроки снова собрались вместе и приглашаются во дворец благоденствия»',                   // 145
	'Осталось просканировать',                         // 146
	'Осталось просканировать',                         // 147
	'Осталось просканировать',                         // 148
	'Осталось просканировать',                         // 149
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 0 ячеек из 5',     // 150
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 1 ячеек из 5',     // 151
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 2 ячеек из 5',     // 152
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 3 ячеек из 5',     // 153
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 4 ячеек из 5',     // 154
	'Игроки вошли во дворец благоденствия, им необходимо открыть ячейки.Открыто 5 ячеек из 5',     // 155
	'','','','',
	'Игроки достали жетоны, им необходимо вставить их в статую',         // 160
	'','','','','','','','','',
	'Игроки получили ключ от двери в коридор',           // 170
	'','','','','','','','','',
	'Игроки в коридоре',                                 // 180
	'','','','','','','','','',
	'Игроки в комнате с энергостеной',                   // 190
	'','','','','','','','','',
	'Игроки вернулись в комнату2.',                   // 200
	'','','','','','','','','',
	'Игроки вводят координаты',                          // 210
	'','','','','','','','','',
	'Подготовка к перелёту',                          // 220
	'','','','','','','','','',
	'Перелёт',                          // 230
	'','','','','','','','','',
	'Квест пройден',                          // 240
	
];

exports.quest_state = 0;

exports.last_player_pass = 0;

exports.quest_error = '';

exports.videos_played = 0;

exports.codes = ['', '', '', '', '735', '', '', '', ''];

exports.coordinates = '';

// активная кнопка для оператора
exports.active_button = '';



// сброс значений
exports.reset = function() {
	exports.quest_state = 0;
	exports.last_player_pass = 0;
	exports.quest_error = '';
	exports.codes = ['', '', '', '', '735', '', '', '', ''];
	exports.count = 0;
	exports.active_button = '';
	exports.videos_played = 0;
}

// exports.get_quest_state = function() {
// 	var str = exports.quest_states[exports.quest_state];
// 	if (exports.quest_state > 110 && exports.quest_state < 120) {
// 		str += ' ' + parseInt(exports.count - exports.quest_state % 10) + ' человек';
// 	}
// 	return str;
// }