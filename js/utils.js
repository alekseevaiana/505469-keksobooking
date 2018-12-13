'use strict';

(function () {
  var KeyCode = {
    Esc: 27,
    Enter: 13
  };

  var isEscEvent = function (evt) {
    return evt.keyCode === KeyCode.Esc;
  };

  var isEnterEvent = function (evt) {
    return evt.keyCode === KeyCode.Enter;
  };

  window.utils = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };
})();
