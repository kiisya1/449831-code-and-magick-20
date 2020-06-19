'use strict';

(function () {
  var LOAD_URL = 'https://javascript.pages.academy/code-and-magick/data';
  var SAVE_URL = 'https://javascript.pages.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        case StatusCode.NOT_FOUND:
          error = 'Ничего не найдено';
          break;
        case StatusCode.BAD_REQUEST:
          error = 'Неверный запрос';
          break;
        default:
          error = 'Статус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open('POST', SAVE_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
