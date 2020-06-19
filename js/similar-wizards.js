'use strict';

(function () {

  var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var NUMBER_OF_WIZARDS = 4;

  var setup = document.querySelector('.setup');
  var similarBlock = setup.querySelector('.setup-similar');

  var getRandomElement = window.util.getRandomElement;
  var generateRandomNumber = window.util.generateRandomNumber;

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
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;

    return wizardElement;
  };

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

  // Добавляет dom-элементы на страницу

  var renderWizards = function (wizards) {
    var randomStart = generateRandomNumber(0, (wizards.length - NUMBER_OF_WIZARDS));
    var randomEnd = randomStart + NUMBER_OF_WIZARDS;
    wizards = wizards.slice(randomStart, randomEnd);
    var similarList = similarBlock.querySelector('.setup-similar-list');
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(getWizardElement(wizard));
    });

    similarList.appendChild(fragment);
  };

  window.similarWizards = {
    COAT_COLORS: COAT_COLORS,
    EYES_COLORS: EYES_COLORS,
    generate: generateWizardsObjects,
    render: renderWizards
  };

})();
