'use strict';

(function () {
  var titleInput = document.querySelector('#title');

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

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  // Добавила атрибут disabled к полям формы
  for (var i = 0; i < adFormFieldsets.length; i++) {
    var adFormFieldset = adFormFieldsets[i];
    adFormFieldset.disabled = true;
  }

  var removeFieldsetDisabledAtr = function () {
    for (var j = 0; j < adFormFieldsets.length; j++) {
      var adFormFieldset2 = adFormFieldsets[j];
      adFormFieldset2.removeAttribute('disabled');
    }
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    removeFieldsetDisabledAtr();
  };

  var changeAddressField = function (left, top) {
    var pinCenterOffset = window.data.MAIN_PIN_CIRCLE_DIAMETER / 2;
    var totalPinHeight = (window.data.MAIN_PIN_CIRCLE_DIAMETER + window.data.MAIN_PIN_SIZE_POINT_HEIGHT);
    var x = (left + pinCenterOffset);
    var y = (top + totalPinHeight);
    document.getElementById('address').value = x + ', ' + y;
  };

  window.form = {
    activateForm: activateForm,
    changeAddressField: changeAddressField
  };
})();

