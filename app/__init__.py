# -*- coding: utf-8 -*-

from flask import Flask

# Определение приложения flask

APP = Flask(__name__, template_folder="templates", static_folder="static")

# импорт обработчиков событий
from app import views
