# -*- coding: utf-8 -*-

from flask import Flask, render_template, request, Response
import json

APP = Flask(__name__, template_folder="project/client/templates",
            static_folder="project/client/static")


@APP.route("/")
def main():
    """Return main template"""

    return "Test"


if __name__ == "__main__":
    APP.run(debug=True, host="0.0.0.0")
