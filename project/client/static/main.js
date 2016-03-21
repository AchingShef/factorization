function showResult(response, number) {
    "use strict";
    // создаем абзац, в котором будет содержаться ответ
    // и начинаем формировать ответ

    var div = document.getElementsByClassName("response")[0],
        p = document.createElement("p"),
        result = number,
        len,
        i;

    // устанавливаем css класс элемента DOM

    p.className = "response";

    // если ответ - массив множителей

    if (Array.isArray(response) === true) {
        len = response.length;

        // и несколько элементов в массиве

        if (len > 1) {
            result += " = ";

            // выводим элементы массива

            for (i = 0; i < len - 1; i += 1) {
                result += response[i] + " * ";
            }

            result += response[len - 1];
        } else {

            // иначе простое число

            result += " - простое число";
            p.className += " error";
        }
    } else {

        // иначе просто выводим результат(ошибку)

        result += " - " + response;
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
        showResult(e.target.response.result, value);
    };

    // событие на ошибку

    xhr.onerror = function (e) {
        // выводим ошибку

        alert(e.target.response);
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