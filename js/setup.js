'use strict';

(function () {

  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var NUMBER_OF_WIZARDS = 4;

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
    var coatColor = window.util.getRandomElement(window.similarWizards.COAT_COLORS);
    evt.target.style.fill = coatColor;
    coatColorInput.value = coatColor;
  };

  // Меняет цвет глаз персонажа

  var onWizardEyesClick = function (evt) {
    var eyesColor = window.util.getRandomElement(window.similarWizards.EYES_COLORS);
    evt.target.style.fill = eyesColor;
    eyesColorInput.value = eyesColor;
  };

  // Меняет цвет фаербола

  var onWizardFireballClick = function (evt) {
    var fireballColor = window.util.getRandomElement(FIREBALL_COLORS);
    evt.target.style.backgroundColor = fireballColor;
    fireballColorInput.value = fireballColor;
  };

  // Выводит на страницу блок настроек

  var showSetupWindow = function () {
    setup.classList.remove('hidden');
    similarBlock.classList.remove('hidden');

    document.addEventListener('keydown', onSetupEscapePress);
    userNameInput.addEventListener('invalid', window.validation.onUserNameInvalid);
    userNameInput.addEventListener('input', window.validation.onUserNameInput);
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
    setup.style.top = '';
    setup.style.left = '';

    document.removeEventListener('keydown', onSetupEscapePress);
    userNameInput.removeEventListener('invalid', window.validation.onUserNameInvalid);
    userNameInput.removeEventListener('input', window.validation.onUserNameInput);
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
    window.util.isEnterEvent(evt, showSetupWindow);
  });

  setupClose.addEventListener('click', function () {
    hideSetupWindow();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, hideSetupWindow);
  });

  var wizards = window.similarWizards.generateWizardsObjects(NUMBER_OF_WIZARDS);
  window.similarWizards.renderWizards(wizards);

  // Перемещение окна настроек

  var setupHandler = setup.querySelector('.upload');

  setupHandler.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          setupHandler.removeEventListener('click', onClickPreventDefault);
        };
        setupHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
