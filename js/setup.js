'use strict';

var setup = document.querySelector('.setup');
var similarBlock = setup.querySelector('.setup-similar');
var similarList = similarBlock.querySelector('.setup-similar-list');
var similarTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var fragment = document.createDocumentFragment();

setup.classList.remove('hidden');

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

// Вычисляет случайное число от min до (max+1)

var generateRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var generateProperty = function (array) {
  var randomNumber = generateRandomNumber(0, (array.length - 1));
  return array[randomNumber];
};

var generateObjects = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {};
    wizard.name = generateProperty(names) + ' ' + generateProperty(surnames);
    wizard.coatColor = generateProperty(coatColors);
    wizard.eyesColor = generateProperty(eyesColors);
    wizards.push(wizard);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarTemplate.cloneNode(true);
  var wizardName = wizardElement.querySelector('.setup-similar-label');
  var wizardCoat = wizardElement.querySelector('.wizard-coat');
  var wizardEyes = wizardElement.querySelector('.wizard-eyes');

  wizardName.textContent = wizard.name;
  wizardCoat.style.fill = wizard.coatColor;
  wizardEyes.style.fill = wizard.eyesColor;

  return wizardElement;
};

var renderWizardList = function () {
  var wizardsList = generateObjects();

  wizardsList.forEach(function (wizard) {
    fragment.appendChild(renderWizard(wizard));
  });

  similarList.appendChild(fragment);
};

renderWizardList();
similarBlock.classList.remove('hidden');
