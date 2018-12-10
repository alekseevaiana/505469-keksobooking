'use strict';

(function () {
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

  var createHousePhotoElement = function (housePhotoUrl) {
    var similarPhotoElementTemplate = document.querySelector('#card').content.querySelector('.popup__photo');
    var photoElement = similarPhotoElementTemplate.cloneNode(true);
    photoElement.src = housePhotoUrl;
    return photoElement;
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

  window.card = {
    renderCard: renderCard
  };
})();
