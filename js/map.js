'use strict';

(function () {
  var houses = window.data.getNewHouses();

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

  var makePageActive = function () {
    mapBlock.classList.remove('map--faded');

    window.pin.renderNewPins(houses, onHouseSelect);
    window.form.activateForm();
    updateAddress();
  };

  var onFirstMouseDown = function () {
    makePageActive();

    mainPin.removeEventListener('mousedown', onFirstMouseDown);
  };
  mainPin.addEventListener('mousedown', onFirstMouseDown);
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      updateAddress();

      var shift = {
        x: startCoordinats.x - moveEvt.clientX,
        y: startCoordinats.y - moveEvt.clientY
      };

      startCoordinats = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = mainPin.offsetTop - shift.y;
      var left = mainPin.offsetLeft - shift.x;

      var pinCenterOffset = window.data.MAIN_PIN_CIRCLE_DIAMETER / 2;
      var totalPinHeight = (window.data.MAIN_PIN_CIRCLE_DIAMETER + window.data.MAIN_PIN_SIZE_POINT_HEIGHT);

      if (left < (window.data.PIN_LOCATION_LEFT_MIN - pinCenterOffset)) {
        left = window.data.PIN_LOCATION_LEFT_MIN - pinCenterOffset;
      }

      if (left > (window.data.PIN_LOCATION_LEFT_MAX - pinCenterOffset)) {
        left = window.data.PIN_LOCATION_LEFT_MAX - pinCenterOffset;
      }

      if (top < window.data.PIN_LOCATION_TOP_MIN - totalPinHeight) {
        top = window.data.PIN_LOCATION_TOP_MIN - totalPinHeight;
      }

      if (top > window.data.PIN_LOCATION_TOP_MAX - totalPinHeight) {
        top = window.data.PIN_LOCATION_TOP_MAX - totalPinHeight;
      }

      mainPin.style.top = top + 'px';
      mainPin.style.left = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      updateAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
