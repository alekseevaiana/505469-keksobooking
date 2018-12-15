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
      errorBlock.classList.add('hidden');
    };

    document.addEventListener('keydown', function (evt) {
      if (window.utils.isEscEvent(evt)) {
        closePopup();
      }
    });
  };

  window.popup = {
    showErrorPopup: showErrorPopup
  };
})();
