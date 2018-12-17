'use strict';

(function () {
  var titleInput = document.querySelector('#title');
  var adFormFieldsets = window.view.adForm.querySelectorAll('fieldset');
  var roomsNumberSelect = document.querySelector('#room_number');
  var guestsNumberSelect = document.querySelector('#capacity');
  var houseTypeSelect = document.querySelector('#type');
  var priceField = document.querySelector('#price');

  var updateAddress = function () {
    var left = parseInt(window.main.mainPin.style.left, 10);
    var top = parseInt(window.main.mainPin.style.top, 10);
    window.form.changeAddressField(left, top);
  };

  var onLoad = function () {
    window.popup.showSuccessPopup();
  };

  window.view.adForm.addEventListener('submit', function (evt) {
    window.backend.send(new FormData(window.view.adForm), onLoad, window.main.onError);
    evt.preventDefault();
  });

  titleInput.addEventListener('invalid', function () {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Минимальная длина — 30 символов');
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

  var limitPrice = function () {
    if (houseTypeSelect.value === 'bungalo') {
      priceField.min = '0';
      priceField.placeholder = '0';
    } else if (houseTypeSelect.value === 'flat') {
      priceField.min = '1000';
      priceField.placeholder = '1000';
    } else if (houseTypeSelect.value === 'house') {
      priceField.min = '5000';
      priceField.placeholder = '5000';
    } else if (houseTypeSelect.value === 'palace') {
      priceField.min = '10000';
      priceField.placeholder = '10000';
    }
  };

  limitPrice();

  houseTypeSelect.addEventListener('change', function () {
    limitPrice();
  });

  priceField.addEventListener('invalid', function () {
    if (priceField.validity.rangeUnderflow && (priceField.min === '0')) {
      priceField.setCustomValidity('Минимальная цена 0');
    } else if (priceField.validity.rangeUnderflow && (priceField.min === '1000')) {
      priceField.setCustomValidity('Минимальная цена 1000');
    } else if (priceField.validity.rangeUnderflow && (priceField.min === '5000')) {
      priceField.setCustomValidity('Минимальная цена 5000');
    } else if (priceField.validity.rangeUnderflow && (priceField.min === '10000')) {
      priceField.setCustomValidity('Минимальная цена 10000');
    } else if (priceField.validity.rangeOverflow) {
      priceField.setCustomValidity('Максимальная значение 1000000');
    } else {
      priceField.setCustomValidity('');
    }
  });

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
    window.view.adForm.classList.remove('ad-form--disabled');
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
    updateAddress: updateAddress,
    activateForm: activateForm,
    changeAddressField: changeAddressField
  };
})();

