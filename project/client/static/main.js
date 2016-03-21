function showResult(response, number) {
    "use strict";

    // создаем абзац, в котором будет содержаться ответ
    // и начинаем формировать ответ

    var div = document.getElementsByClassName("response")[0],
        p = document.createElement("p"),
        result = number + " = ",
        len = response.length,
        i;

    // устанавливаем css класс элемента dom

    p.className = "response";

    // если это составное число с множителями

    if (len > 1) {
        for (i = 0; i < len - 1; i += 1) {
            result += response[i] + " * ";
        }

        result += response[len - 1];
    } else {

        // если это простое число

        result += "простое число";
        p.className += " error";
    }

    p.innerHTML = result;

    // добавляем абзац в div ответа

    div.appendChild(p);
}

function sendValue(numberField) {
    "use strict";

    // cоздаём новый объект XMLHttpRequest и набор данных

    var xhr = new XMLHttpRequest(),
        formData = new FormData(),
        value = numberField.value;

    // устанавливаем тип возвращаемого значения запроса

    xhr.responseType = "json";

    // добавляем ключ и значение в набор

    formData.append("number", value);

    // событие на успешную загрузку

    xhr.onload = function (e) {
        // запрос успешно выполнился

        if (e.target.status === 200) {
            showResult(e.target.response.result, value);
        } else {
            // запрос выполнился с ошибкой

            alert(e.target.response.msg);
        }
    };

    // событие на ошибку

    xhr.onerror = function (e) {
        alert(e.target.result);
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