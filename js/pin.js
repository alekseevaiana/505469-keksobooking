'use strict';

(function () {
  var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (house, onHouseSelect) {
    var pinElement = similarPinElementTemplate.cloneNode(true);
    pinElement.style.left = house.location.x;
    pinElement.style.top = house.location.y;
    pinElement.querySelector('.map__pin img').setAttribute('alt', house.offer.title);
    pinElement.querySelector('.map__pin img').setAttribute('src', house.avatar);
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      onHouseSelect(house);
    });
    return pinElement;
  };

  var renderNewPins = function (houses, onHouseSelect) {
    var fragment = document.createDocumentFragment();
    var pinElementsList = document.querySelector('.map__pins');
    for (var j = 0; j < houses.length; j++) {
      fragment.appendChild(renderPin(houses[j], onHouseSelect));
    }
    pinElementsList.appendChild(fragment);
    return pinElementsList;
  };

  window.pin = {
    renderNewPins: renderNewPins
  };

})();
