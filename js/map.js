'use strict';

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

// что-то тут не работает setCustomValidity, проверить позже
var houseTypeSelect = document.querySelector('#type');
var priceField = document.querySelector('#price');

var limitPrice = function () {
  if (houseTypeSelect.value === 'bungalo') {
    priceField.min = '0';
    priceField.placeholder = '0';
    priceField.setCustomValidity('Минимальная цена 0');
  } else if (houseTypeSelect.value === 'flat') {
    priceField.min = '1000';
    priceField.placeholder = '1000';
    priceField.setCustomValidity('Минимальная цена 1000');
  } else if (houseTypeSelect.value === 'house') {
    priceField.min = '5000';
    priceField.placeholder = '5000';
    priceField.setCustomValidity('Минимальная цена 5000');
  } else if (houseTypeSelect.value === 'palace') {
    priceField.min = '10000';
    priceField.placeholder = '10000';
    priceField.setCustomValidity('Минимальная цена 10000');
  } else {
    priceField.setCustomValidity('');
  }
};

checkNumberOfGuests();
limitPrice();

roomsNumberSelect.addEventListener('change', function () {
  checkNumberOfGuests();
});

guestsNumberSelect.addEventListener('change', function () {
  checkNumberOfGuests();
});

houseTypeSelect.addEventListener('change', function () {
  limitPrice();
});

priceField.addEventListener('change', function () {
  limitPrice();
});

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

var addPinEvents = function () {
  var mapPinsList = document.querySelectorAll('.map__pin');
  var setPinClickHandler = function (mapPin, house) {
    mapPin.addEventListener('click', function () {
      var previousCard = mapBlock.querySelector('.map__card');
      if (previousCard) {
        mapBlock.removeChild(previousCard);
      }
      mapBlock.appendChild(renderCard(house));
    });
  };
  for (var k = 1; k < mapPinsList.length; k++) {
    setPinClickHandler(mapPinsList[k], houses[k - 1]);
  }
};

var removeFieldsetDisabledAtr = function () {
  for (var j = 0; j < adFormFieldsets.length; j++) {
    var adFormFieldset2 = adFormFieldsets[j];
    adFormFieldset2.removeAttribute('disabled');
  }
};

// что происходит, когда стр активирована
var makePageActive = function () {
  mapBlock.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  renderNewPins(houses);
  addPinEvents();
  changeAddressField();
  removeFieldsetDisabledAtr();
};

var changeAddressField = function () {
  var left = parseInt(mainPin.style.left, 10);
  var top = parseInt(mainPin.style.top, 10);
  var pinCenterOffset = MAIN_PIN_CIRCLE_DIAMETER / 2;
  var totalPinHeight = (MAIN_PIN_CIRCLE_DIAMETER + MAIN_PIN_SIZE_POINT_HEIGHT);
  var x = (left + pinCenterOffset);
  var y = (top + totalPinHeight);
  // при активации страницы, в поле адрес записываются координаты
  document.getElementById('address').value = x + ', ' + y;
};

// активация страницы
var onFirstMouseDown = function () {
  makePageActive();

  mainPin.removeEventListener('mousedown', onFirstMouseDown);
};
mainPin.addEventListener('mousedown', onFirstMouseDown);


// dragged.js

mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoordinats = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    changeAddressField();

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

    var pinCenterOffset = MAIN_PIN_CIRCLE_DIAMETER / 2;
    var totalPinHeight = (MAIN_PIN_CIRCLE_DIAMETER + MAIN_PIN_SIZE_POINT_HEIGHT);

    if (left < (PIN_LOCATION_LEFT_MIN - pinCenterOffset)) {
      left = PIN_LOCATION_LEFT_MIN - pinCenterOffset;
    }

    if (left > (PIN_LOCATION_LEFT_MAX - pinCenterOffset)) {
      left = PIN_LOCATION_LEFT_MAX - pinCenterOffset;
    }

    if (top < PIN_LOCATION_TOP_MIN - totalPinHeight) {
      top = PIN_LOCATION_TOP_MIN - totalPinHeight;
    }

    if (top > PIN_LOCATION_TOP_MAX - totalPinHeight) {
      top = PIN_LOCATION_TOP_MAX - totalPinHeight;
    }

    mainPin.style.top = top + 'px';
    mainPin.style.left = left + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    changeAddressField();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});


