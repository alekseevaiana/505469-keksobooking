'use strict';

(function () {
  var sendUrl = 'https://js.dump.academy/keksobooking';
  var getDataUrl = 'https://js.dump.academy/keksobooking/data';

  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  var send = function (data, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка загрузки объявления');
      }
    });
    xhr.open('POST', sendUrl);
    xhr.send(data);
  };

  var getData = function (onLoad, onError) {
    xhr.open('GET', getDataUrl);
    xhr.addEventListener('load', function () {
      if (xhr.status === window.data.SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Ошибка');
      }
    });

    xhr.send();

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 1;
  };

  window.backend = {
    send: send,
    getData: getData
  };

})();
