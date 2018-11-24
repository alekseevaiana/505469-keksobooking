'use strict';

var offerTitles = [
  'Уютное гнездышко для молодожонов', 'Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var getAuthorAvatar = function (number) {
  var avatarCode = 'img/avatars/user' + '0' + number + '.png';
  return avatarCode;
};

var similarAds = {
  author: {avatar: getAuthorAvatar(1)},
  offer: {
    title: offerTitles[0],
    address: {x: 600, y: 350},
    price: Math.floor(Math.random() * 1000), // число, случайная цена от 1000 до 1 000 000
    type: 100,
    rooms: 2,
    guests: 3,
    checkin: '12:00',
    checkout: '13:00',
    features: 'массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner", "description": пустая строка',
    description: '',
    photos: 'массив из строк "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg" и "http://o0.github.io/assets/images/tokyo/hotel3.jpg" расположенных в произвольном порядке'
  },
  location: {
    x: '600px',
    y: '200px',
  }
};

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

var pinElementsList = document.querySelector('.map__pins'); // куда вставить пины

var renderPin = function () {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin'); // нашли шаблон
  var pinElement = similarPinElementTemplate.cloneNode(true); // копия шаблона
  pinElementsList.appendChild(pinElement); // вставили шаблон
  pinElement.style.left = similarAds.location.x;
  pinElement.style.top = similarAds.location.y;
  pinElement.querySelector('.button__image').setAttribute('alt', similarAds.offer.title);
  pinElement.querySelector('.button__image').setAttribute('src', similarAds.author.avatar); // нужно убрать класс и найти элемент друним способом
}

renderPin()
