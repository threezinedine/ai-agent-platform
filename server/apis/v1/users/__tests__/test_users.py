import unittest
from fastapi.testclient import TestClient
from databases import *
from app import app
from constants import *


class UserTest(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)
        create_test_db_and_tables()
        app.dependency_overrides[get_session] = get_test_session

    def tearDown(self):
        # Clean up the database
        drop_test_db_and_tables()

    def test_create_user(self):
        username = "test-create-username"
        password = "test-create-password"

        respose = self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        self.assertEqual(respose.status_code, HTTP_200_OK)

        response_json = respose.json()
        self.assertEqual(response_json["username"], username)
        self.assertTrue("id" in response_json)
        self.assertTrue("password" not in response_json)

    def test_login_created_user(self) -> None:
        username = "test-login-username"
        password = "test-login-password"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        response = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": password,
            },
        )

        self.assertEqual(response.status_code, HTTP_200_OK)

        response_json = response.json()
        self.assertTrue("token" in response_json)
        self.assertTrue("user" in response_json)

        user_info = response_json["user"]
        self.assertEqual(user_info["username"], username)
        self.assertTrue("id" in user_info)
        self.assertTrue("password" not in user_info)

    def test_login_non_existent_user(self) -> None:
        response = self.client.post(
            "/api/v1/users/login",
            json={
                "username": "non-existent-username",
                "password": "non-existent-password",
            },
        )

        self.assertEqual(response.status_code, HTTP_404_NOT_FOUND)

    def test_login_user_with_wrong_password(self) -> None:
        username = "test-wrong-password-username"
        password = "test-wrong-password-password"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        response = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": "wrong-password",
            },
        )

        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    def test_get_user_info_with_no_token(self) -> None:
        response = self.client.get("/api/v1/users/me")

        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    def test_get_user_info_with_invalid_token(self) -> None:
        response = self.client.get(
            "/api/v1/users/me",
            headers={"Authorization": "Bearer invalid-token"},
        )

        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    def test_get_user_info_with_valid_token(self) -> None:
        username = "test-get-user-info-username"
        password = "test-get-user-info-password"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        response = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": password,
            },
        )

        token = response.json()["token"]

        response = self.client.get(
            "/api/v1/users/me",
            headers={"Authorization": token},
        )

        self.assertEqual(response.status_code, HTTP_200_OK)
