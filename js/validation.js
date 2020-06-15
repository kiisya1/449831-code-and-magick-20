'use strict';

(function () {
  window.validation = {
    // Валидирует поле ввода имени
    onUserNameInvalid: function (evt) {
      if (evt.target.validity.tooShort) {
        evt.target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      } else if (evt.target.validity.tooLong) {
        evt.target.setCustomValidity('Имя не должно превышать 25-ти символов');
      } else if (evt.target.validity.valueMissing) {
        evt.target.setCustomValidity('Обязательное поле');
      } else {
        evt.target.setCustomValidity('');
      }
    },
    // Убирает сообщение об ошибке при вводе имени
    onUserNameInput: function (evt) {
      evt.target.setCustomValidity('');
    }
  };
})();
