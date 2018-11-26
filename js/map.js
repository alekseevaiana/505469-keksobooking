'use strict';

var PIN_LOCATION_LEFT_MIN = 200;
var PIN_LOCATION_LEFT_MAX = 1200;
var PIN_LOCATION_TOP_MIN = 130;
var PIN_LOCATION_TOP_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_NUM_MIN = 2;
var ROOM_NUM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;

var offerTitles = [
  'Уютное гнездышко для молодожонов', 'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var getAuthorAvatar = function (number) {
  var avatarCode = 'img/avatars/user' + '0' + number + '.png';
  return avatarCode;
};

var getNewHouses = function () {
  var houses = [];
  for (var i = 1; i <= 8; i++) {
    var pinLocationLeft = Math.floor(Math.random() * (PIN_LOCATION_LEFT_MAX - PIN_LOCATION_LEFT_MIN) + PIN_LOCATION_LEFT_MIN) + 'px';
    var pinLocationTop = Math.floor(Math.random() * (PIN_LOCATION_TOP_MAX - PIN_LOCATION_TOP_MIN) + PIN_LOCATION_TOP_MIN) + 'px';
    var pinSrc = getAuthorAvatar(i);
    houses.push({
      avatar: pinSrc,
      offer: {
        title: offerTitles[i],
        address: {x: 600, y: 350},
        price: Math.floor(Math.random() * (PRICE_MAX - PRICE_MIN) + PRICE_MIN),
        type: ['palace', 'flat', 'house', 'bungalo'],
        rooms: Math.floor(Math.random() * (ROOM_NUM_MAX - ROOM_NUM_MIN) + ROOM_NUM_MIN),
        guests: Math.floor(Math.random() * (GUESTS_MAX - GUESTS_MIN) + GUESTS_MIN),
        checkin: ['12:00', '13:00', '14:00'],
        checkout: ['12:00', '13:00', '14:00'],
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: '',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      },
      location: {x: pinLocationLeft, y: pinLocationTop}
    });
  }
  return houses;
}

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var renderPin = function (house) {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // нашли шаблон пина
  var pinElement = similarPinElementTemplate.cloneNode(true); // копия шаблона пина
  pinElement.style.left = house.location.x;
  pinElement.style.top = house.location.y;
  pinElement.querySelector('.button__image').setAttribute('alt', house.offer.title);
  pinElement.querySelector('.button__image').setAttribute('src', house.avatar); // нужно убрать класс и найти элемент друним способом
  return pinElement;
}

var renderNewPins = function (houses) {
  var fragment = document.createDocumentFragment();
  var pinElementsList = document.querySelector('.map__pins'); // куда вставить пины
  for (var j = 0; j < houses.length; j++) {
    fragment.appendChild(renderPin(houses[j]));
  }
  pinElementsList.appendChild(fragment);
};

renderNewPins(getNewHouses());

var renderCard = function (house) {
  var cardElementTemplate = document.querySelector('#card').content.querySelector('.map__card'); // нашла шаблон карточкм
  var cardElement = cardElementTemplate.cloneNode(true); // скопировала шаблон карточки
  cardElement.querySelector('.popup__title').textContent = house.offer.title; // заполнить карточку данными из одного определенного домика
  cardElement.querySelector('.popup__text--price').textContent = house.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__text--capacity').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + house.offer.checkin[1] + ', выезд до ' + house.offer.checkout[2];
  cardElement.querySelector('.popup__description').textContent = house.offer.description;
  return cardElement;
};

var renderNewCard = function (houses) {
  var fragment = document.createDocumentFragment();
  var placeForCardElement = document.querySelector('.map'); // место куда вставить карточку
  for (var j = 0; j < 1; j++) {
    fragment.appendChild(renderCard(houses[j]));
  }
  placeForCardElement.appendChild(fragment);
}

renderNewCard(getNewHouses());
