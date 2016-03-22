# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, Response
import json

APP = Flask(__name__, template_folder="app/client/templates",
            static_folder="app/client/static")


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
            result.append(num)

            value //= num
        else:
            num += 1

    result.append(value)

    return result


@APP.route("/get_factorization/", methods=["POST"])
def factorization():
    """Возвращает результат в зависимости от переданного значения"""
    # получение значения из формы

    number = request.form.get("number")
    status = 200

    # преобразовывание значения к целому

    try:
        number = int(number)
    except Exception, exc:
        number = None

    # в зависимости от условия создание ответа

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
