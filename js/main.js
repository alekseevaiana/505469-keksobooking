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

  var onLoadPins = function (houses) {
    var pinsFragment = window.pin.renderNewPins(houses, onHouseSelect);
    var pinElementsList = document.querySelector('.map__pins');
    pinElementsList.appendChild(pinsFragment);
  };

  var onError = function (errorMessage) {
    window.popup.showErrorPopup(errorMessage);
  };

  var makePageActive = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.getData(onLoadPins, onError);
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
