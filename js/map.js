'use strict';
var NUMBER_OF_HOUSES = 8;
var PIN_LOCATION_LEFT_MIN = 200;
var PIN_LOCATION_LEFT_MAX = 1150;
var PIN_LOCATION_TOP_MIN = 130;
var PIN_LOCATION_TOP_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_NUM_MIN = 2;
var ROOM_NUM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;

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

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var renderPin = function (house) {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinElement = similarPinElementTemplate.cloneNode(true);
  pinElement.style.left = house.location.x;
  pinElement.style.top = house.location.y;
  pinElement.querySelector('.map__pin img').setAttribute('alt', house.offer.title);
  pinElement.querySelector('.map__pin img').setAttribute('src', house.avatar);
  return pinElement;
};

var renderNewPins = function (houses) {
  var fragment = document.createDocumentFragment();
  var pinElementsList = document.querySelector('.map__pins');
  for (var j = 0; j < houses.length; j++) {
    fragment.appendChild(renderPin(houses[j]));
  }
  pinElementsList.appendChild(fragment);
};

renderNewPins(getNewHouses());

var translateHouseType = function (type) {
  if (type === 'palace') {
    return 'Дворец';
  }
  if (type === 'flat') {
    return 'Квартира';
  }
  if (type === 'house') {
    return 'Дом';
  }
  if (type === 'bungalo') {
    return 'Бунгало';
  }
  return type;
};

var renderCard = function (house) {
  var cardElementTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardElement = cardElementTemplate.cloneNode(true);

  var addTextContent = function (elementName, content) {
    cardElement.querySelector('.popup__' + elementName).textContent = content;
  };

  addTextContent('title', house.offer.title);
  addTextContent('text--address', house.offer.address);
  addTextContent('text--price', house.offer.price + '₽/ночь');
  addTextContent('text--capacity', house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей');
  addTextContent('text--time', 'Заезд после ' + house.offer.checkin[1] + ', выезд до ' + house.offer.checkout[2]);
  addTextContent('description', house.offer.description);
  addTextContent('type', translateHouseType(house.offer.type));

  var featuresEl = cardElement.querySelector('.popup__features');
  featuresEl.innerHTML = '';
  featuresEl.appendChild(createFeaturesList(house));

  var houseNewPhotoPlace = cardElement.querySelector('.popup__photos');
  houseNewPhotoPlace.innerHTML = '';
  houseNewPhotoPlace.appendChild(createHouseNewPhotos(house));

  var imageElement = cardElement.querySelector('.popup__avatar');
  imageElement.src = house.avatar;

  return cardElement;
};

var createFeaturesList = function (house) {
  var fragment = document.createDocumentFragment();
  var features = house.offer.features;
  for (var i = 0; i < features.length; i++) {
    var feature = features[i];
    var li = document.createElement('li');
    li.className = 'popup__feature popup__feature--' + feature;
    fragment.appendChild(li);
  }
  return fragment;
};

var createHousePhotoElement = function (housePhotoUrl) {
  var similarPhotoElementTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
  var photoElement = similarPhotoElementTemplate.cloneNode(true);
  photoElement.src = housePhotoUrl;
  return photoElement;
};

var createHouseNewPhotos = function (house) {
  var housePhotosUrls = house.offer.photos;
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < housePhotosUrls.length; j++) {
    var photoUrl = housePhotosUrls[j];
    var photoElement = createHousePhotoElement(photoUrl);
    fragment.appendChild(photoElement);
  }
  return fragment;
};

var houses = getNewHouses();
var card = renderCard(houses[0]);
document.querySelector('.map').appendChild(card);
