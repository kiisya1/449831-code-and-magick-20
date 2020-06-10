'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARDS = 4;

// var MIN_NAME_LENGTH = 2;
// var MAX_NAME_LENGTH = 25;

var setup = document.querySelector('.setup');
var similarBlock = setup.querySelector('.setup-similar');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
var coatColorInput = setup.querySelector('input[name="coat-color"]');
var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
var fireballColorInput = setup.querySelector('input[name="fireball-color"]');


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

// Добавляет dom-элементы на страницу

var renderWizards = function (wizards) {
  var similarList = similarBlock.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  wizards.forEach(function (wizard) {
    fragment.appendChild(getWizardElement(wizard));
  });

  similarList.appendChild(fragment);
};


// Закрывает блок настроек если нажата клавиша Escape

var onSetupEscapePress = function (evt) {
  if (evt.key === 'Escape') {
    if (userNameInput.focused === false) {
      evt.preventDefault();
      hideSetupWindow();
    }
  }
};

// Добавляет значение true при фокусе на поле ввода имени

var onUserNameFocus = function (evt) {
  evt.target.focused = true;
};

// Убирает значение true при фокусе на поле ввода имени

var onUserNameBlur = function (evt) {
  evt.target.focused = false;
};

// Валидирует поле ввода имени

var onUserNameInvalid = function (evt) {
  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
  }
};


/*
// Выводит сообщение об ошибке по мере ввода имени

var onUserNameInput = function (evt) {
  var valueLength = evt.target.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userNameInput.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_NAME_LENGTH) {
    userNameInput.setCustomValidity('Удалите лишние ' + (valueLength - MIN_NAME_LENGTH) + ' симв.');
  } else {
    userNameInput.setCustomValidity('');
  }
};

*/

// Меняет цвет мантии персонажа

var onWizardCoatClick = function (evt) {
  var coatColor = getRandomElement(COAT_COLORS);
  evt.target.style.fill = coatColor;
  coatColorInput.value = coatColor;
};

// Меняет цвет глаз персонажа

var onWizardEyesClick = function (evt) {
  var eyesColor = getRandomElement(EYES_COLORS);
  evt.target.style.fill = eyesColor;
  eyesColorInput.value = eyesColor;
};

// Меняет цвет фаербола

var onWizardFireballClick = function (evt) {
  var fireballColor = getRandomElement(FIREBALL_COLORS);
  evt.target.style.backgroundColor = fireballColor;
  fireballColorInput.value = fireballColor;
};

// Выводит на страницу блок настроек

var showSetupWindow = function () {
  setup.classList.remove('hidden');
  similarBlock.classList.remove('hidden');

  document.addEventListener('keydown', onSetupEscapePress);
  userNameInput.addEventListener('invalid', onUserNameInvalid);
  userNameInput.addEventListener('focus', onUserNameFocus);
  userNameInput.addEventListener('blur', onUserNameBlur);

  setupWizardCoat.addEventListener('click', onWizardCoatClick);
  setupWizardEyes.addEventListener('click', onWizardEyesClick);
  setupWizardFireball.addEventListener('click', onWizardFireballClick);
};

// Закрывает блок настроек

var hideSetupWindow = function () {
  setup.classList.add('hidden');
  similarBlock.classList.add('hidden');

  document.removeEventListener('keydown', onSetupEscapePress);
  userNameInput.removeEventListener('invalid', onUserNameInvalid);
  userNameInput.removeEventListener('focus', onUserNameFocus);
  userNameInput.removeEventListener('blur', onUserNameBlur);

  setupWizardCoat.removeEventListener('click', onWizardCoatClick);
  setupWizardEyes.removeEventListener('click', onWizardEyesClick);
  setupWizardFireball.removeEventListener('click', onWizardFireballClick);
};

// Добавляются обработчики событий

setupOpen.addEventListener('click', function () {
  showSetupWindow();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    showSetupWindow();
  }
});

setupClose.addEventListener('click', function () {
  hideSetupWindow();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    hideSetupWindow();
  }
});

var wizards = generateWizardsObjects(NUMBER_OF_WIZARDS);
renderWizards(wizards);
