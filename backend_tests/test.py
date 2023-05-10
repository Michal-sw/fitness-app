import collections
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
        self.user = self.token.json()['user']
        self.refresh_token = self.token.cookies

    def tearDown(self):
        test_duration = time.time() - self.timer
        print(f"Test duration: {round(test_duration, 2)}s")

    def test_get_users(self):
        response = requests.get(url=f'{self.url}/users', verify=False, headers=self.headers)
        self.assertEqual({'code': 200, 'isList': True},
                         {
                             'code': response.status_code,
                             'isList': isinstance(response.json()['result'], collections.Sequence)
                         },
                         msg=f"Get response: {response.json()['result']}")

    def test_get_user_by_id(self):
        response = requests.get(url=f'{self.url}/users/{self.user["_id"]}', verify=False, headers=self.headers)
        self.assertEqual({'code': 200, 'id': self.user["_id"]},
                         {
                             'code': response.status_code,
                             'id': response.json()['result']['_id']
                         },
                         msg=f"Get response: {response.json()}")

    def test_get_refresh_token(self):
        response = requests.post(url=f'{self.url}/users/refresh', verify=False, headers=self.headers,
                                 cookies=self.refresh_token)
        self.assertEqual({'code': 200, 'hasToken': True},
                         {
                             'code': response.status_code,
                             'hasToken': 'token' in response.json()
                         },
                         msg=f"Get response: {response.json()}")

    def test_get_user_activities(self):
        response = requests.post(url=f'{self.url}/users/{self.user["_id"]}/activities', verify=False,
                                 headers=self.headers)
        self.assertEqual({'code': 200, 'isList': True},
                         {
                             'code': response.status_code,
                             'isList': isinstance(response.json()['result']['activities'], collections.Sequence)
                         },
                         msg=f"Get response: {response.json()}")

    def test_get_survey_by_id(self):
        response = requests.get(url=f'{self.url}/surveys/{self.user["_id"]}', verify=False,
                                headers=self.headers)

        self.assertEqual({'code': 200, 'isList': True},
                         {
                             'code': response.status_code,
                             'isList': isinstance(response.json()['result'], collections.Sequence)
                         },
                         msg=f"Get response: {response.json()}")

    def test_get_activities(self):
        response = requests.get(url=f'{self.url}/activities', verify=False,
                                headers=self.headers)

        self.assertEqual({'code': 200, 'isList': True},
                         {
                             'code': response.status_code,
                             'isList': isinstance(response.json()['result'], collections.Sequence)
                         },
                         msg=f"Get response: {response.json()}")