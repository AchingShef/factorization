# -*- coding: utf-8 -*-

import unittest
import json
from app import APP, views


class FactorisationTestCase(unittest.TestCase):

    def setUp(self):
        APP.config["TESTING"] = True
        self.app = APP.test_client()

    def tearDown(self):
        APP.config["TESTING"] = False

    def get_factorization(self, number):
        """Метод юнит-теста"""

        response = self.app.post(
            "/get_factorization/", data=dict(number=number))

        data = json.loads(response.data)

        return data

    def test_get_factorization(self):
        """Тест метода /get_factorization/"""

        data = self.get_factorization(34839583)

        assert len(data["result"]) > 1

        data = self.get_factorization(u"abc")

        assert u"Введите натуральное число" in data["result"]

        data = self.get_factorization(1)

        assert u"Введите натуральное число больше 1" in data["result"]

        data = self.get_factorization(5)

        assert len(data["result"]) == 1

if __name__ == "__main__":
    unittest.main()
