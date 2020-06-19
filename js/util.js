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

  window.util = {
    generateRandomNumber: generateRandomNumber,
    getRandomElement: getRandomElement,
    isEnterEvent: isEnterEvent
  };
})();
