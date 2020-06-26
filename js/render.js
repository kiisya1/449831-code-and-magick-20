'use strict';

(function () {
  var NUMBER_OF_WIZARDS = 4;

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
    wizardCoat.style.fill = wizard.colorCoat;
    wizardEyes.style.fill = wizard.colorEyes;

    return wizardElement;
  };

  // Добавляет dom-элементы на страницу

  var renderWizards = function (wizards) {
    var similarList = similarBlock.querySelector('.setup-similar-list');
    similarList.innerHTML = '';
    var fragment = document.createDocumentFragment();

    wizards.slice(0, NUMBER_OF_WIZARDS).forEach(function (wizard) {
      fragment.appendChild(getWizardElement(wizard));
    });

    similarList.appendChild(fragment);
  };

  window.render = renderWizards;
})();
