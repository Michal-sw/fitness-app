import unittest
import time
import requests


class Test(unittest.TestCase):
    def setUp(self):
        self.timer = time.time()
        self.url = 'https://127.0.0.1:8080'
        self.token = requests.post(f'{self.url}/users/login', verify=False, json={
            "login": "123",
            "password": "123"
        })
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.token.json()['token']}"
        }

    def tearDown(self):
        test_duration = time.time() - self.timer
        print(f"Test duration: {round(test_duration, 2)}s")

    def test_get_users(self):
        response = requests.get(url=f'{self.url}/users', verify=False, headers=self.headers)
        self.assertEqual(response, '', msg=f"Get response: {response.json()} | token: {self.token.json()['token']}")
