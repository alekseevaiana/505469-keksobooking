'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var updateAddress = function () {
    var left = parseInt(mainPin.style.left, 10);
    var top = parseInt(mainPin.style.top, 10);
    window.form.changeAddressField(left, top);
  };

  var onHouseSelect = function (house) {
    var previousCard = mapBlock.querySelector('.map__card');
    if (previousCard) {
      mapBlock.removeChild(previousCard);
    }
    mapBlock.appendChild(window.card.renderCard(house));
  };

  var onLoad = function (houses) {
    var successPopup = document.querySelector('.success');
    var pinsFragment = window.pin.renderNewPins(houses, onHouseSelect);
    var pinElementsList = document.querySelector('.map__pins');
    pinElementsList.appendChild(pinsFragment);
    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    };
    var closePopup = function () {
      successPopup.classList.add('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };
  };

  var onError = function (errorMessage) {
    var mainBlock = document.querySelector('main');
    var errorPopup = document.querySelector('.error');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    mainBlock.appendChild(errorBlock);
    var errorMessageParagraph = errorBlock.querySelector('.error__message');
    errorMessageParagraph.innerText = errorMessage;
    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    };

    var closePopup = function () {
      errorPopup.classList.add('hidden');
      document.addEventListener('keydown', onPopupEscPress);
    };
  };

  var makePageActive = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.getData(onLoad, onError);
    window.form.activateForm();
    updateAddress();
  };

  window.main = {
    makePageActive: makePageActive,
    onError: onError,
    updateAddress: updateAddress,
    mainPin: mainPin
  };
})();
