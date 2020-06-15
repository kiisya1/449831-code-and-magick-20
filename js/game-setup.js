'use strict';

(function () {
  window.fireballSize = 22;
  window.wizardSpeed = 3;
  window.wizardWidth = 70;

  window.getFireballSpeed = function (isWindFromLeft) {
    return isWindFromLeft ? 5 : 2;
  };

  window.getWizardHeigh = function () {
    return window.wizardWidth * 1.337;
  };

  window.getWizardX = function (fieldWidth) {
    return (fieldWidth - window.wizardWidth) / 2;
  };

  window.getWizardY = function (fieldHeight) {
    return fieldHeight / 3;
  };

})();
