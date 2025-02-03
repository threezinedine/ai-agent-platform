import unittest
from fastapi.testclient import TestClient
from databases import *
from app import app


class UserTest(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        create_test_db_and_tables()
        app.dependency_overrides[get_session] = get_test_session

    def tearDown(self):
        # Clean up the database
        drop_test_db_and_tables()

    def test_create_user(self):
        respose = self.client.post(
            "/api/v1/users/register",
            json={
                "username": "test",
                "password": "test",
            },
        )

        self.assertEqual(respose.status_code, 200)

        response_json = respose.json()
        self.assertEqual(response_json["username"], "test")
        self.assertTrue("id" in response_json)
        self.assertTrue("password" not in response_json)
