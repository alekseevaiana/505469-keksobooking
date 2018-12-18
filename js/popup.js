'use strict';

(function () {
  var showErrorPopup = function (errorMessage) {
    var mainBlock = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    mainBlock.appendChild(errorBlock);
    var errorMessageParagraph = errorBlock.querySelector('.error__message');
    errorMessageParagraph.innerText = errorMessage;

    var closePopup = function () {
      if (errorBlock) {
        mainBlock.removeChild(errorBlock);
      }
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onPopupEscPress);
      window.main.makePageActive();
    };

    var onClick = function () {
      closePopup();
    };

    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var showSuccessPopup = function () {
    var adForm = document.querySelector('.ad-form');
    var mainBlock = document.querySelector('main');
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    mainBlock.appendChild(successMessage);

    var closePopup = function () {
      if (successMessage) {
        mainBlock.removeChild(successMessage);
      }
      adForm.reset();
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onClick = function (evt) {
      closePopup();
      evt.preventDefault();
    };

    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
      evt.preventDefault();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onPopupEscPress);
  };


  var cardPopupHandler = function () {
    var cardPopup = document.querySelector('.map__card');
    var cardPopupCloseBtn = cardPopup.querySelector('.popup__close');

    var closePopup = function () {
      cardPopup.classList.add('hidden');
    };

    cardPopupCloseBtn.addEventListener('click', function () {
      closePopup();
    });

    cardPopupCloseBtn.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterEvent(evt)) {
        closePopup();
      }
    });

    document.addEventListener('keydown', function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    });
  };

  window.popup = {
    showErrorPopup: showErrorPopup,
    showSuccessPopup: showSuccessPopup,
    cardPopupHandler: cardPopupHandler
  };
})();
