'use strict';

(function () {

  // Вычисляет случайное число от min до max
  var generateRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  // Выбирает случайное значение из массива данных

  var getRandomElement = function (array) {
    var randomNumber = generateRandomNumber(0, (array.length - 1));
    return array[randomNumber];
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === 'Enter') {
      action();
    }
  };

  // Формирует случайный массив из массива данных

  var shuffleArray = function (items) {
    var j;
    var temp;
    var randomItems = items.slice();
    for (var i = randomItems.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = randomItems[j];
      randomItems[j] = randomItems[i];
      randomItems[i] = temp;
    }
    return randomItems;
  };

  window.util = {
    generateRandomNumber: generateRandomNumber,
    getRandomElement: getRandomElement,
    isEnterEvent: isEnterEvent,
    shuffleArray: shuffleArray
  };
})();
