'use strict';

var NUMBER_OF_HOUSES = 8;
var PIN_LOCATION_LEFT_MIN = 100;
var PIN_LOCATION_LEFT_MAX = 1200;
var PIN_LOCATION_TOP_MIN = 150;
var PIN_LOCATION_TOP_MAX = 650;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var ROOM_NUM_MIN = 2;
var ROOM_NUM_MAX = 5;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var MAIN_PIN_CIRCLE_HEIGHT = 62;
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

var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (house) {
  var pinElement = similarPinElementTemplate.cloneNode(true);
  pinElement.style.left = house.location.x;
  pinElement.style.top = house.location.y;
  pinElement.querySelector('.map__pin img').setAttribute('alt', house.offer.title);
  pinElement.querySelector('.map__pin img').setAttribute('src', house.avatar);
  return pinElement;
};


// добавляет новые пины
var renderNewPins = function (houses) {
  var fragment = document.createDocumentFragment();
  var pinElementsList = document.querySelector('.map__pins');
  for (var j = 0; j < houses.length; j++) {
    fragment.appendChild(renderPin(houses[j]));
  }
  pinElementsList.appendChild(fragment);
  return pinElementsList;
};

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

// добавляет карточку
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

// обработка событий

var mapBlock = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mainPin = document.querySelector('.map__pin--main');
var adFormFieldsets = adForm.querySelectorAll('fieldset');

// Добавила атрибут disabled к полям формы

for (var i = 0; i < adFormFieldsets.length; i++) {
  var adFormFieldset = adFormFieldsets[i];
  adFormFieldset.disabled = true;
}

var onMainPinClick = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderNewPins(houses);
  addPinEvents();
  mainPin.removeEventListener('mouseup', onMainPinClick);
  document.getElementById('address').value = parseInt(mainPin.style.left, 10) + ', ' + (parseInt(mainPin.style.top, 10) + (MAIN_PIN_CIRCLE_HEIGHT / 2 + MAIN_PIN_SIZE_POINT_HEIGHT));

  removeFieldsetDisabledAtr();
};

mainPin.addEventListener('mouseup', onMainPinClick);

var addPinEvents = function () {
  var mapPinsList = document.querySelectorAll('.map__pin');
  var onPinClick = function (mapPin, house) {
    mapPin.addEventListener('click', function () {
      var previousCard = mapBlock.querySelector('.map__card');
      if (previousCard) {
        mapBlock.removeChild(previousCard);
      }
      mapBlock.appendChild(renderCard(house));
    });
  };
  for (var k = 1; k < mapPinsList.length; k++) {
    onPinClick(mapPinsList[k], houses[k - 1]);
  }
};

var removeFieldsetDisabledAtr = function () {
  for (var j = 0; j < adFormFieldsets.length; j++) {
    var adFormFieldset2 = adFormFieldsets[j];
    adFormFieldset2.removeAttribute('disabled');
  }
};

// обработка формы

var titleInput = document.querySelector('#title');
var priceInput = document.querySelector('#price');

titleInput.addEventListener('invalid', function () {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Минимальная длина — 2 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Максимальная длина — 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Ввeдите заголовок объявления');
  } else {
    titleInput.setCustomValidity('');
  }
});

titleInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Минимальная длина — 30 символов');
  } else {
    target.setCustomValidity('');
  }
});

priceInput.addEventListener('invalid', function () {
  if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity('Минимальное значение 0');
  } else if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Максимальная значение 1000000');
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Ввeдите значение');
  } else {
    priceInput.setCustomValidity('');
  }
});

priceInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value < 0) {
    target.setCustomValidity('Минимальное значение 0');
  } else {
    target.setCustomValidity('');
  }
});

// комнаты и гости

var roomsNumberSelect = document.querySelector('#room_number');
var guestsNumberSelect = document.querySelector('#capacity');

var checkNumberOfGuests = function () {
  if (roomsNumberSelect.value === '1' && guestsNumberSelect.value !== '1') {
    guestsNumberSelect.setCustomValidity('В одну комнату только 1 гостя');
  } else if (roomsNumberSelect.value === '2' && (guestsNumberSelect.value === '3' || guestsNumberSelect.value === '0')) {
    guestsNumberSelect.setCustomValidity('Больше двух нельзя');
  } else if (roomsNumberSelect.value === '3' && guestsNumberSelect.value === '0') {
    guestsNumberSelect.setCustomValidity('Выберите количество гостей');
  } else if (roomsNumberSelect.value === '100' && guestsNumberSelect.value !== '0') {
    guestsNumberSelect.setCustomValidity('Не для гостей');
  } else {
    guestsNumberSelect.setCustomValidity('');
  }
};

checkNumberOfGuests();

roomsNumberSelect.addEventListener('change', function () {
  checkNumberOfGuests();
});

guestsNumberSelect.addEventListener('change', function () {
  checkNumberOfGuests();
});

