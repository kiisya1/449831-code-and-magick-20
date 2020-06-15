'use strict';

(function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

  var setup = document.querySelector('.setup');
  var similarBlock = setup.querySelector('.setup-similar');

  // Генерирует dom-элемент

  var getWizardElement = function (wizard) {
    var wizardTemplate = document.querySelector('#similar-wizard-template')
        .content
        .querySelector('.setup-similar-item');
    var wizardElement = wizardTemplate.cloneNode(true);
    var wizardName = wizardElement.querySelector('.setup-similar-label');
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');

    wizardName.textContent = wizard.name;
    wizardCoat.style.fill = wizard.coatColor;
    wizardEyes.style.fill = wizard.eyesColor;

    return wizardElement;
  };

  window.similarWizards = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,

    // Генерирует массив объектов из случайных значений
    generateWizardsObjects: function (number) {
      var wizards = [];
      for (var i = 0; i < number; i++) {
        var wizard = {};
        wizard.name = window.util.getRandomElement(NAMES) + ' ' + window.util.getRandomElement(SURNAMES);
        wizard.coatColor = window.util.getRandomElement(COAT_COLORS);
        wizard.eyesColor = window.util.getRandomElement(EYES_COLORS);
        wizards.push(wizard);
      }
      return wizards;
    },

    // Добавляет dom-элементы на страницу
    renderWizards: function (wizards) {
      var similarList = similarBlock.querySelector('.setup-similar-list');
      var fragment = document.createDocumentFragment();

      wizards.forEach(function (wizard) {
        fragment.appendChild(getWizardElement(wizard));
      });

      similarList.appendChild(fragment);
    }
  };

})();
