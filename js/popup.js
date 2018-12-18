'use strict';

(function () {
  // var createPopupFromTemplate = function (template) {
//   var block = template.cloneNode(true);
//   window.view.mainBlock.appendChild(block);
//
//   var closePopup = function () {
//     if (block) {
//       window.view.mainBlock.removeChild(block);
//     }
//     document.removeEventListener('click', onClick);
//     document.removeEventListener('keydown', onPopupEscPress);
//     window.main.makePageActive();
//   };
//
//   var onClick = function () {
//     closePopup();
//
//   };
//
//   var onPopupEscPress = function (evt) {
//     if (window.utils.isEscEvent(evt)) {
//       closePopup();
//     }
//   };
//
//   document.addEventListener('click', onClick);
//   document.addEventListener('keydown', onPopupEscPress);
//
//   return block;
// };
//
// var showErrorPopup = function (errorMessage) {
//   var template = document.querySelector('#error').content.querySelector('.error');
//
//   var block = createPopupFromTemplate(template);
//
//   var errorMessageParagraph = block.querySelector('.error__message');
//   errorMessageParagraph.innerText = errorMessage;
// };
//
// var showSuccessPopup = function () {
//   var template = document.querySelector('#success').content.querySelector('.success');
//   createPopupFromTemplate(template);
// };


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
    };

    var onClick = function () {
      closePopup();
      window.main.makePageActive();
    };

    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
        window.main.makePageActive();
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
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onPopupEscPress);
    };

    var onClick = function (evt) {
      closePopup();
      adForm.reset();
      evt.preventDefault();
    };

    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
        adForm.reset();
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
      document.removeEventListener('keydown', onPopupEscPress);
    };

    cardPopupCloseBtn.addEventListener('click', function () {
      closePopup();
    });

    var onPopupEnterPress = function (evt) {
      if (window.utils.isEnterEvent(evt)) {
        closePopup();
      }
    };

    var onPopupEscPress = function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    };

    cardPopupCloseBtn.addEventListener('keydown', onPopupEnterPress);

    document.addEventListener('keydown', onPopupEscPress);
  };

  window.popup = {
    showErrorPopup: showErrorPopup,
    showSuccessPopup: showSuccessPopup,
    cardPopupHandler: cardPopupHandler
  };
})();
