'use strict';

(function () {
// функция для отправки данных на сервер
  var sendUrl = 'https://js.dump.academy/keksobooking';
  var getDataUrl = 'https://js.dump.academy/keksobooking/data';
  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });
    xhr.open('POST', sendUrl);
    xhr.send(data);
  };

  var getData = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', getDataUrl);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.send();
  };

  window.backend = {
    send: send,
    getData: getData
  };

})();
