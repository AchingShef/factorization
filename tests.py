# -*- coding: utf-8 -*-

import runserver
import unittest


class FactorisationTestCase(unittest.TestCase):

    def setUp(self):
        runserver.APP.config["TESTING"] = True
        self.app = runserver.APP.test_client()

    def tearDown(self):
        pass

    def test_get_factorization(self):
        """Test /get_factorization/ method"""

        response = self.app.post("/get_factorization/", dict(number=34839583))
        assert "500 INTERNAL SERVER ERROR" in response.status
        response = self.app.post("/get_factorization/", dict(number=u"abc"))
        assert "500 INTERNAL SERVER ERROR" in response.status
        response = self.app.post("/get_factorization/", dict(number=1))
        assert "500 INTERNAL SERVER ERROR" in response.status
        response = self.app.post("/get_factorization/", dict(number=2))
        assert "500 INTERNAL SERVER ERROR" in response.status

if __name__ == "__main__":
    unittest.main()
