'use strict';

(function () {
  var onFirstMouseDownMainPin = function () {
    window.main.makePageActive();
    window.main.mainPin.removeEventListener('mousedown', onFirstMouseDownMainPin);
  };
  window.main.mainPin.addEventListener('mousedown', onFirstMouseDownMainPin);
  window.main.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoordinats = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      window.main.updateAddress();

      var shift = {
        x: startCoordinats.x - moveEvt.clientX,
        y: startCoordinats.y - moveEvt.clientY
      };

      startCoordinats = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var top = window.main.mainPin.offsetTop - shift.y;
      var left = window.main.mainPin.offsetLeft - shift.x;

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

      window.main.mainPin.style.top = top + 'px';
      window.main.mainPin.style.left = left + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.main.updateAddress();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
