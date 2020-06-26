'use strict';

(function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var getRandomElement = window.util.getRandomElement;
  var renderWizards = window.render;

  // Генерирует массив объектов из случайных значений

  var generateWizardsObjects = function (number) {
    var wizards = [];
    for (var i = 0; i < number; i++) {
      var wizard = {};
      wizard.name = getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES);
      wizard.coatColor = getRandomElement(COAT_COLORS);
      wizard.eyesColor = getRandomElement(EYES_COLORS);
      wizards.push(wizard);
    }
    return wizards;
  };

  var getRank = function (wizard, coatColor, eyesColor) {
    var rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function (wizards, coatColor, eyesColor) {
    renderWizards(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right, coatColor, eyesColor) - getRank(left, coatColor, eyesColor);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  window.similarWizards = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    generate: generateWizardsObjects,
    update: updateWizards
  };

})();
