function showResult(response) {
    "use strict";

    var textArea = document.getElementsByName("response")[0],
        result = textArea.value + response.number + " = ",
        len = response.result.length,
        i;

    if (len > 1) {
        for (i = 0; i < len - 1; i += 1) {
            result += response.result[i] + " * ";
        }

        result += response.result[len - 1];
    } else {
        result += "простое число";
    }

    result += "\n";
    textArea.value = result;
}

function sendValue(numberField) {
    "use strict";

    // cоздаём новый объект XMLHttpRequest и набор данных

    var xhr = new XMLHttpRequest(),
        formData = new FormData();

    // устанавливаем тип возвращаемого значения запроса

    xhr.responseType = "json";

    // добавляем ключ и значение в набор

    formData.append("number", numberField.value);

    // событие на успешную загрузку

    xhr.onload = function (e) {
        // запрос успешно выполнился

        if (e.target.status === 200) {
            showResult(e.target.response);
        } else {
            // запрос выполнился с ошибкой

            alert(e.target.response.msg);
        }
    };

    // событие на ошибку

    xhr.onerror = function (e) {
        if (e.target.result === null) {
            alert(e.target.result);
        }
    };

    // открываем соединение с /get_factorization/, асинхронный post запрос

    xhr.open("POST", "/get_factorization/", true);

    // отправляем данные

    xhr.send(formData);
}

function setEvents() {
    "use strict";

    // получаем елементы DOM

    var numberField = document.getElementsByName("number")[0],
        submitBtn = document.getElementsByName("submit")[0];

    // устанавливаем события для елементов DOM

    submitBtn.onclick = function (e) {
        sendValue(numberField);
    };

    numberField.onkeypress = function (e) {
        if (e.keyCode === 13) {
            sendValue(numberField);
        }
    };
}

window.onload = function () {
    "use strict";

    // устанавливаем события после загрузки страницы

    setEvents();
};