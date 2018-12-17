'use strict';

(function () {
  var PIN_LOCATION_LEFT_MIN = 40;
  var PIN_LOCATION_LEFT_MAX = 1160;
  var PIN_LOCATION_TOP_MIN = 130;
  var PIN_LOCATION_TOP_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var MAIN_PIN_CIRCLE_DIAMETER = 62;
  var MAIN_PIN_SIZE_POINT_HEIGHT = 20;
  var adForm = document.querySelector('.ad-form');
  var mainBlock = document.querySelector('main');
  var cardPopup = document.querySelector('.map__card');

  window.data = {
    PIN_LOCATION_LEFT_MIN: PIN_LOCATION_LEFT_MIN,
    PIN_LOCATION_LEFT_MAX: PIN_LOCATION_LEFT_MAX,
    PIN_LOCATION_TOP_MIN: PIN_LOCATION_TOP_MIN,
    PIN_LOCATION_TOP_MAX: PIN_LOCATION_TOP_MAX,
    PRICE_MIN: PRICE_MIN,
    PRICE_MAX: PRICE_MAX,
    MAIN_PIN_CIRCLE_DIAMETER: MAIN_PIN_CIRCLE_DIAMETER,
    MAIN_PIN_SIZE_POINT_HEIGHT: MAIN_PIN_SIZE_POINT_HEIGHT,
    adForm: adForm,
    mainBlock: mainBlock,
    cardPopup: cardPopup
  };
})();
