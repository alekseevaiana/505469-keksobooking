'use strict';

(function () {

  var renderPin = function (house, onHouseSelect) {
    var similarPinElementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

    var pinElement = similarPinElementTemplate.cloneNode(true);
    pinElement.style.left = house.location.x + 'px';
    pinElement.style.top = house.location.y + 'px';
    pinElement.querySelector('.map__pin img').setAttribute('alt', house.offer.title);
    pinElement.querySelector('.map__pin img').setAttribute('src', house.author.avatar);
    pinElement.addEventListener('click', function (evt) {
      evt.preventDefault();
      onHouseSelect(house);
    });
    return pinElement;
  };

  // var filterHouseType = function () {
  //   var housingTypeSelect = document.querySelector('#housing-type');
  //   housingTypeSelect.addEventListener('change', function () {
  //     if (housingTypeSelect.value === 'flat' && houses[j].offer.type === 'flat') {
  //       fragment.appendChild(renderPin(houses[j], onHouseSelect));
  //     }
  //   });
  // };

  var renderNewPins = function (houses, onHouseSelect) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < houses.length; j++) {
      if (houses[j].offer) {
        fragment.appendChild(renderPin(houses[j], onHouseSelect));
      }
    }
    return fragment;
  };

  window.pin = {
    renderNewPins: renderNewPins
  };

})();
