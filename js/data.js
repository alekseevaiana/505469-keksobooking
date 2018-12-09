'use strict';

(function () {
  var NUMBER_OF_HOUSES = 8;
  var PIN_LOCATION_LEFT_MIN = 40;
  var PIN_LOCATION_LEFT_MAX = 1160;
  var PIN_LOCATION_TOP_MIN = 130;
  var PIN_LOCATION_TOP_MAX = 630;
  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;
  var ROOM_NUM_MIN = 2;
  var ROOM_NUM_MAX = 5;
  var GUESTS_MIN = 1;
  var GUESTS_MAX = 10;
  var MAIN_PIN_CIRCLE_DIAMETER = 62;
  var MAIN_PIN_SIZE_POINT_HEIGHT = 20;

  var offerTitles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var houseFeatures = [
    'wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'
  ];

  var houseCheckIn = [
    '12:00', '13:00', '14:00'
  ];

  var houseCheckOut = ['12:00', '13:00', '14:00'];

  var housePhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  var houseType = ['palace', 'flat', 'house', 'bungalo'];

  function shuffle(a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  var getFeatures = function () {
    var copied = houseFeatures.concat();
    shuffle(copied);
    var randomIndex = getIntervalNumbers(copied.length - 1, 0);
    return copied.slice(0, randomIndex);
  };

  var getAuthorAvatar = function (number) {
    var avatarCode = 'img/avatars/user' + '0' + (number + 1) + '.png';
    return avatarCode;
  };

  var getIntervalNumbers = function (max, min) {
    var randomData = Math.floor((Math.random() * (max - min) + min));

    return randomData;
  };

  var getRandomHouseType = function () {
    var randomIndex = getIntervalNumbers(houseType.length - 1, 0);
    return houseType[randomIndex];
  };

  var getNewHouses = function () {
    var houses = [];
    for (var i = 0; i < NUMBER_OF_HOUSES; i++) {
      var pinLocationLeft = getIntervalNumbers(PIN_LOCATION_LEFT_MAX, PIN_LOCATION_LEFT_MIN) + 'px';
      var pinLocationTop = getIntervalNumbers(PIN_LOCATION_TOP_MAX, PIN_LOCATION_TOP_MIN) + 'px';
      var pinSrc = getAuthorAvatar(i);
      houses.push({
        avatar: pinSrc,
        offer: {
          title: offerTitles[i],
          address: getIntervalNumbers(PIN_LOCATION_TOP_MAX, PIN_LOCATION_TOP_MIN) + ', ' + getIntervalNumbers(PIN_LOCATION_LEFT_MAX, PIN_LOCATION_LEFT_MIN),
          price: getIntervalNumbers(PRICE_MAX, PRICE_MIN),
          type: getRandomHouseType(),
          rooms: getIntervalNumbers(ROOM_NUM_MAX, ROOM_NUM_MIN),
          guests: getIntervalNumbers(GUESTS_MAX, GUESTS_MIN),
          checkin: houseCheckIn,
          checkout: houseCheckOut,
          features: getFeatures(),
          description: '',
          photos: housePhotos
        },
        location: {x: pinLocationLeft, y: pinLocationTop}
      });
    }
    return houses;
  };

  window.data = {
    NUMBER_OF_HOUSES: NUMBER_OF_HOUSES,
    PIN_LOCATION_LEFT_MIN: PIN_LOCATION_LEFT_MIN,
    PIN_LOCATION_LEFT_MAX: PIN_LOCATION_LEFT_MAX,
    PIN_LOCATION_TOP_MIN: PIN_LOCATION_TOP_MIN,
    PIN_LOCATION_TOP_MAX: PIN_LOCATION_TOP_MAX,
    PRICE_MIN: PRICE_MIN,
    PRICE_MAX: PRICE_MAX,
    ROOM_NUM_MIN: ROOM_NUM_MIN,
    ROOM_NUM_MAX: ROOM_NUM_MAX,
    GUESTS_MIN: GUESTS_MIN,
    GUESTS_MAX: GUESTS_MAX,
    MAIN_PIN_CIRCLE_DIAMETER: MAIN_PIN_CIRCLE_DIAMETER,
    MAIN_PIN_SIZE_POINT_HEIGHT: MAIN_PIN_SIZE_POINT_HEIGHT,
    getNewHouses: getNewHouses
  };
})();
