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
    var pinsFragment = window.pin.renderNewPins(houses, onHouseSelect);
    var pinElementsList = document.querySelector('.map__pins');
    pinElementsList.appendChild(pinsFragment);
  };

  var onError = function () {
    var mainBlock = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    mainBlock.appendChild(errorBlock);
  };

  var makePageActive = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.getData(onLoad, onError); // onError
    window.form.activateForm();
    updateAddress();
  };

  window.main = {
    makePageActive: makePageActive,
    updateAddress: updateAddress,
    mainPin: mainPin
  };
})();
