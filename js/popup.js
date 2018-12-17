'use strict';

(function () {
  var createPopupFromTemplate = function (template) {
    var block = template.cloneNode(true);
    window.data.mainBlock.appendChild(block);

    var closePopup = function () {
      if (block) {
        window.data.mainBlock.removeChild(block);
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

    return block;
  };

  var showErrorPopup = function (errorMessage) {
    var template = document.querySelector('#error').content.querySelector('.error');

    var block = createPopupFromTemplate(template);

    var errorMessageParagraph = block.querySelector('.error__message');
    errorMessageParagraph.innerText = errorMessage;
  };

  var showSuccessPopup = function () {
    var template = document.querySelector('#success').content.querySelector('.success');
    createPopupFromTemplate(template);
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
