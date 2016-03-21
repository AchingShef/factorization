# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, Response
import json

APP = Flask(__name__, template_folder="project/client/templates",
            static_folder="project/client/static")


@APP.route("/")
def main():
    """Возвращает главный шаблон"""

    return render_template("main.html")


def factor(value):
    """Возвращает простые множители числа"""

    result = []
    num = 2

    while num * num <= value:
        if value % num == 0:
            result.append(str(num))

            value //= num
        else:
            num += 1

    result.append(str(value))

    return result


@APP.route("/get_factorization/", methods=["POST"])
def factorization():
    """Возвращает результат в зависимости от переданного значения"""

    # получаем значение из формы

    number = request.form.get("number")
    status = 200

    # пытаемся преобразовать значение к целому

    try:
        number = int(number)
    except Exception, exc:
        number = None

    # в зависимости от условия создаем ответ

    if number is None:
        data = {"result": u"Введите натуральное число"}
    elif number < 2:
        data = {"result": u"Введите натуральное число больше 1"}
    else:
        result = factor(number)
        data = {"result": result}

    data = json.dumps(data)
    response = Response(data, status=status, mimetype="application/json")

    return response


if __name__ == "__main__":
    APP.run(debug=True, host="0.0.0.0", threaded=True)
