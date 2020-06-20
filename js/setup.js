'use strict';

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COAT_COLORS = window.similarWizards.COAT_COLORS;
  var EYES_COLORS = window.similarWizards.EYES_COLORS;

  var setup = document.querySelector('.setup');
  var similarBlock = setup.querySelector('.setup-similar');
  var similarList = similarBlock.querySelector('.setup-similar-list');
  var form = setup.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var userNameInput = setup.querySelector('.setup-user-name');
  var setupWizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var setupWizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');
  var coatColorInput = setup.querySelector('input[name="coat-color"]');
  var eyesColorInput = setup.querySelector('input[name="eyes-color"]');
  var fireballColorInput = setup.querySelector('input[name="fireball-color"]');
  var userPic = setup.querySelector('.upload');

  var renderWizards = window.similarWizards.render;

  var onUserNameInvalid = window.validation.userNameInvalid;
  var onUserNameInput = window.validation.userNameInput;

  var isEnterEvent = window.util.isEnterEvent;
  var getRandomElement = window.util.getRandomElement;

  var onUserPicMousedown = window.move;

  var loadWizards = window.backend.load;
  var saveFormData = window.backend.save;

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

  // Прячет блок похожих волшебников и показывает сообщение об ошибке, если произошла ошибка загрузки

  var onLoadWizardsError = function (errorMessage) {
    similarBlock.classList.add('hidden');
    showErrorMassage('Ошибка загрузки похожих волшебников: ' + errorMessage);
  };

  // Рендерит волшебников, если загрузка была успешной

  var onLoadWizardsSuccess = function (wizards) {
    renderWizards(wizards);
  };

  // Закрывает окно настроек при успешной отправке данных на сервер

  var onUploadUserSettingsSuccess = function () {
    hideSetupWindow();
  };

  //  Показывает сообщение об ошибке, если произошла ошибка при отправке данных на сервер

  var onUploadUserSettingsError = function (errorMessage) {
    showErrorMassage(errorMessage);
  };

  // Выводит на страницу блок ошибки

  var showErrorMassage = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Отправляет данные формы на сервер

  var onFormSubmit = function (evt) {
    saveFormData(new FormData(form), onUploadUserSettingsSuccess, onUploadUserSettingsError);
    evt.preventDefault();
  };

  // Выводит на страницу блок настроек

  var showSetupWindow = function () {
    setup.classList.remove('hidden');
    similarBlock.classList.remove('hidden');
    userNameInput.focused = false;

    loadWizards(onLoadWizardsSuccess, onLoadWizardsError);

    form.addEventListener('submit', onFormSubmit);
    userNameInput.addEventListener('invalid', onUserNameInvalid);
    userNameInput.addEventListener('focus', onUserNameFocus);
    userNameInput.addEventListener('blur', onUserNameBlur);
    userNameInput.addEventListener('input', onUserNameInput);
    document.addEventListener('keydown', onSetupEscapePress);
    userPic.addEventListener('mousedown', onUserPicMousedown);

    setupWizardCoat.addEventListener('click', onWizardCoatClick);
    setupWizardEyes.addEventListener('click', onWizardEyesClick);
    setupWizardFireball.addEventListener('click', onWizardFireballClick);
  };

  // Закрывает блок настроек

  var hideSetupWindow = function () {
    setup.classList.add('hidden');
    similarBlock.classList.add('hidden');
    setup.style.top = '';
    setup.style.left = '';
    similarList.innerHTML = '';

    form.removeEventListener('submit', onFormSubmit);
    document.removeEventListener('keydown', onSetupEscapePress);
    userNameInput.removeEventListener('invalid', onUserNameInvalid);
    userNameInput.removeEventListener('input', onUserNameInput);
    userNameInput.removeEventListener('focus', onUserNameFocus);
    userNameInput.removeEventListener('blur', onUserNameBlur);
    userPic.removeEventListener('mousedown', onUserPicMousedown);

    setupWizardCoat.removeEventListener('click', onWizardCoatClick);
    setupWizardEyes.removeEventListener('click', onWizardEyesClick);
    setupWizardFireball.removeEventListener('click', onWizardFireballClick);
  };

  // Добавляются обработчики событий

  setupOpen.addEventListener('click', function () {
    showSetupWindow();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, showSetupWindow);
  });

  setupClose.addEventListener('click', function () {
    hideSetupWindow();
  });

  setupClose.addEventListener('keydown', function (evt) {
    isEnterEvent(evt, hideSetupWindow);
  });

})();
