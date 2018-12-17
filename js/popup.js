'use strict';

(function () {
  var showErrorPopup = function (errorMessage) {
    // var window.data.mainBlock = document.querySelector('main');
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorBlock = errorTemplate.cloneNode(true);
    window.data.mainBlock.appendChild(errorBlock);
    var errorMessageParagraph = errorBlock.querySelector('.error__message');
    errorMessageParagraph.innerText = errorMessage;

    var closePopup = function () {
      if (errorBlock) {
        window.data.mainBlock.removeChild(errorBlock);
      }
      window.main.makePageActive();
    };

    var onClick = function () {
      closePopup();
      document.removeEventListener('click', onClick);
    };

    var onPopupEscPress = function () {
      if (window.utils.isEscEvent) {
        closePopup();
        document.removeEventListener('keydown', onPopupEscPress);
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onPopupEscPress);
  };

  var showSuccessPopup = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successMessage = successTemplate.cloneNode(true);
    window.data.mainBlock.appendChild(successMessage);
    window.data.adForm.reset();

    var closePopup = function () {
      // successMessage.classList.add('hidden');
      if (successMessage) {
        window.data.mainBlock.removeChild(successMessage);
      }
    };

    var onClick = function () {
      closePopup();
      document.removeEventListener('click', onClick);
    };

    var onPopupEscPress = function () {
      if (window.utils.isEscEvent) {
        closePopup();
        document.removeEventListener('keydown', onPopupEscPress);
      }
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
