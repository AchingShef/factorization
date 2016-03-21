function showResult(response, value) {
    "use strict";
    // создание абзаца, в котором будет содержаться ответ
    // начало формирования ответа

    var div = document.getElementsByClassName("response")[0],
        p = document.createElement("p"),
        result = value,
        len,
        i;

    // установка css-класса абзацу

    p.className = "response";

    // если ответ - массив множителей

    if (Array.isArray(response) === true) {
        len = response.length;

        // и несколько элементов в массиве

        if (len > 1) {
            result += " = ";

            // вывод всех элементов массива, кроме последнего

            for (i = 0; i < len - 1; i += 1) {
                result += response[i] + " * ";
            }

            // вывод последнего элемента массива

            result += response[len - 1];
        } else {

            // иначе простое число

            result += " - простое число";
            p.className += " error";
        }
    } else {

        // иначе просто вывод результата(ошибки)

        result += " - " + response;
        p.className += " error";
    }

    p.innerHTML = result;

    // вставка абзаца в div ответа

    div.appendChild(p);
}

function sendValue(field) {
    "use strict";
    // cоздание нового объекта XMLHttpRequest и набор данных

    var xhr = new XMLHttpRequest(),
        params,
        value;

    if (xhr !== undefined) {
        value = field.value;
        params = "number=" + value;

        // устанавливаем тип возвращаемого значения запроса

        xhr.responseType = "json";

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

        // устанавливаем заголовки

        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // отправляем данные

        xhr.send(params);
    }
}

function setEvents() {
    "use strict";
    // получаем елементы DOM

    var field = document.getElementsByName("number")[0],
        submitBtn = document.getElementsByName("submit")[0];

    // устанавливаем события для елементов DOM

    submitBtn.onclick = function (e) {
        sendValue(field);
    };

    field.onkeypress = function (e) {
        if (e.keyCode === 13) {
            sendValue(field);
        }
    };
}

window.onload = function () {
    "use strict";
    // устанавливаем события после загрузки страницы

    setEvents();
};