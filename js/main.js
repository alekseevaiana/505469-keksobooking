'use strict';

(function () {
  var FILTER_DEBOUNCE_INTERVAL = 500;

  var mapBlock = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var onHouseSelect = function (house) {
    var previousCard = mapBlock.querySelector('.map__card');
    if (previousCard) {
      mapBlock.removeChild(previousCard);
    }
    mapBlock.appendChild(window.card.renderCard(house));
    window.popup.cardPopupHandler();
  };

  var renderDataPins = function (houses) {
    var pinsFragment = window.pin.renderNewPins(houses, onHouseSelect);
    var pinElementsList = document.querySelector('.map__pins');
    pinElementsList.appendChild(pinsFragment);
  };

  var onLoadPins = function (houses) {
    renderDataPins(houses);

    var onFilterChange = function () {
      var cardPopup = document.querySelector('.map__card');
      var filterState = getFilters();
      var fiteredHouses = filterHouses(houses, filterState);
      if (cardPopup) {
        cardPopup.classList.add('hidden');
      }
      renderDataPins(fiteredHouses);
    };

    var onFilterChangeDebounced = window.utils.debounce(onFilterChange, FILTER_DEBOUNCE_INTERVAL);

    var filterHandler = function (selector) {
      var el = document.querySelector(selector);
      el.addEventListener('change', onFilterChangeDebounced);
    };

    var selectors = [
      '#housing-type',
      '#housing-price',
      '#housing-guests',
      '#housing-rooms',
      '#filter-wifi',
      '#filter-dishwasher',
      '#filter-parking',
      '#filter-washer',
      '#filter-elevator',
      '#filter-conditioner'
    ];

    selectors.forEach(filterHandler);
  };

  var onError = function (errorMessage) {
    window.popup.showErrorPopup(errorMessage);
  };

  var makePageActive = function () {
    mapBlock.classList.remove('map--faded');
    window.backend.getData(onLoadPins, onError);
    window.form.activateForm();
    window.form.updateAddress();
  };

  var getFilters = function () { // возвращает состояние фильтров
    var rawHousingTypeValue = document.querySelector('#housing-type').value;
    var type = rawHousingTypeValue === 'any' ? null : rawHousingTypeValue;

    var rawHousingPrice = document.querySelector('#housing-price').value;
    var price = rawHousingPrice === 'any' ? null : rawHousingPrice;

    var rawHousingRoomsValue = document.querySelector('#housing-rooms').value;
    var rooms = rawHousingRoomsValue === 'any' ? null : parseInt(rawHousingRoomsValue, 10);

    var rawHousingGuestsValue = document.querySelector('#housing-guests').value;
    var guests = rawHousingGuestsValue === 'any' ? null : parseInt(rawHousingGuestsValue, 10);

    var wifi = document.querySelector('#filter-wifi').checked;
    var dishwasher = document.querySelector('#filter-dishwasher').checked;
    var parking = document.querySelector('#filter-parking').checked;
    var washer = document.querySelector('#filter-washer').checked;
    var elevator = document.querySelector('#filter-elevator').checked;
    var conditioner = document.querySelector('#filter-conditioner').checked;


    return {
      type: type, // null ИЛИ palace ИЛИ bungalo ИЛИ flat
      price: price,
      rooms: rooms,
      guests: guests,
      wifi: wifi,
      dishwasher: dishwasher,
      parking: parking,
      washer: washer,
      elevator: elevator,
      conditioner: conditioner
    };
  };

  // Вернет true, если house соответствует выбранным фильтрам (filterState)
  // Вернет false в противном случае
  var isHouseSatisfiedFilters = function (house, filterState) {
    var offer = house.offer;

    if (filterState.type !== null) {
      if (offer.type !== filterState.type) {
        return false;
      }
    }

    if (filterState.price) {
      if (filterState.price === 'low' && offer.price >= 10000) {
        return false;
      }
      if (filterState.price === 'middle' && (offer.price < 10000 || offer.price >= 50000)) {
        return false;
      }
      if (filterState.price === 'high' && offer.price < 50000) {
        return false;
      }
    }

    if (filterState.rooms !== null) {
      if (offer.rooms !== filterState.rooms) {
        return false;
      }
    }

    if (filterState.guests !== null) {
      if (offer.guests !== filterState.guests) {
        return false;
      }
    }

    if (filterState.wifi && !offer.features.includes('wifi')) {
      return false;
    }

    if (filterState.dishwasher && !offer.features.includes('dishwasher')) {
      return false;
    }

    if (filterState.parking && !offer.features.includes('parking')) {
      return false;
    }

    if (filterState.washer && !offer.features.includes('washer')) {
      return false;
    }

    if (filterState.elevator && !offer.features.includes('elevator')) {
      return false;
    }

    if (filterState.conditioner && !offer.features.includes('conditioner')) {
      return false;
    }
    return true;
  };

  var filterHouses = function (houses, filterState) {
    return houses.filter(function (house) {
      return isHouseSatisfiedFilters(house, filterState);
    });
  };


  window.main = {
    makePageActive: makePageActive,
    onError: onError,
    mainPin: mainPin
  };
})();
