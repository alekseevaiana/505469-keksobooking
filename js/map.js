'use strict';

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
  'Уютное гнездышко для молодожонов',
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
  for (var i = 0; i < 8; i++) {
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
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // нашли шаблон пина
  var pinElement = similarPinElementTemplate.cloneNode(true); // копия шаблона пина
  pinElement.style.left = house.location.x;
  pinElement.style.top = house.location.y;
  pinElement.querySelector('.button__image').setAttribute('alt', house.offer.title);
  pinElement.querySelector('.button__image').setAttribute('src', house.avatar); // нужно убрать класс и найти элемент друним способом
  return pinElement;
};

var renderNewPins = function (houses) {
  var fragment = document.createDocumentFragment();
  var pinElementsList = document.querySelector('.map__pins'); // куда вставить пины
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
  var cardElementTemplate = document.querySelector('#card').content.querySelector('.map__card'); // нашла шаблон карточкм
  var cardElement = cardElementTemplate.cloneNode(true); // скопировала шаблон карточки


  cardElement.querySelector('.popup__title').textContent = house.offer.title; // заполнить карточку данными из одного определенного домика
  cardElement.querySelector('.popup__text--address').textContent = house.offer.address; // заполнить карточку данными из одного определенного домика
  cardElement.querySelector('.popup__text--price').textContent = house.offer.price + '₽/ночь'; // цена
  cardElement.querySelector('.popup__text--capacity').textContent = house.offer.rooms + ' комнаты для ' + house.offer.guests + ' гостей'; // кол-во комнат и гостей
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + house.offer.checkin[1] + ', выезд до ' + house.offer.checkout[2]; // чек ин и чек аут
  cardElement.querySelector('.popup__description').textContent = house.offer.description; // описание
  cardElement.querySelector('.popup__type').textContent = translateHouseType(house.offer.type);

  var featuresEl = cardElement.querySelector('.popup__features'); // находим список с фичами
  featuresEl.innerHTML = ''; // очищаем содержимое
  featuresEl.appendChild(createFeaturesList(house))

  var houseNewPhotoPlace = cardElement.querySelector('.popup__photos');
  houseNewPhotoPlace.innerHTML = ''; // удалили содержимое дива, в который вставили img (img там уже был, мы копировали с него)
  houseNewPhotoPlace.appendChild(createHouseNewPhotos(house));

  return cardElement;
};

var createFeaturesList = function(house) {
  var fragment = document.createDocumentFragment()
  var features = house.offer.features; // вводим переменную фичурс, которая равна указанному массиву
  for (var i = 0; i < features.length; i++) {
    var feature = features[i]; // одна фича равна i-нному элементы массива
    var li = document.createElement('li'); // создаем лишку
    li.className = 'popup__feature popup__feature--' + feature; // даем лишке класс
    fragment.appendChild(li); // вставляем в список с фичами лишку
  }
  return fragment;
}

var createHousePhotoElement = function (housePhotoUrl) {
  var similarPhotoElementTemplate = document.querySelector('#card').content.querySelector('.popup__photo'); // шаблон изображения
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
