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

    def test_update_user_info_with_no_token(self) -> None:
        username = "test-update-username-with-no-token"
        password = "test-update-password-with-no-token"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        response = self.client.put("/api/v1/users/me")

        self.assertEqual(response.status_code, HTTP_401_UNAUTHORIZED)

    def test_update_user_info_with_valid_token(self) -> None:
        username = "test-update-username-with-valid-token"
        password = "test-update-password-with-valid-token"
        new_full_name = "Test Update With Valid Token"
        new_email = "test-update-with-valid-token@gmail.com"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        token = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": password,
            },
        ).json()["token"]

        response = self.client.put(
            "/api/v1/users/me",
            json={
                "username": "fake-username",
                "password": password,
                "full_name": new_full_name,
                "email": new_email,
            },
            headers={"Authorization": token},
        )

        self.assertEqual(response.status_code, HTTP_200_OK)

        response_json = response.json()
        self.assertEqual(response_json["full_name"], new_full_name)
        self.assertEqual(response_json["email"], new_email)
        self.assertEqual(response_json["username"], username)
        self.assertTrue("id" in response_json)

    def test_user_get_avatar(self) -> None:
        username = "test-get-avatar-username"
        password = "test-get-avatar-password"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        token = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": password,
            },
        ).json()["token"]

        response = self.client.get(
            "/api/v1/users/avatar",
            headers={"Authorization": token},
        )

        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.headers["Content-Type"], "image/png")

    def test_user_update_avatar(self) -> None:
        username = "test-update-avatar-username"
        password = "test-update-avatar-password"

        self.client.post(
            "/api/v1/users/register",
            json={
                "username": username,
                "password": password,
            },
        )

        token = self.client.post(
            "/api/v1/users/login",
            json={
                "username": username,
                "password": password,
            },
        ).json()["token"]

        with open("assets/test-ava.png", "rb") as f:
            content = f.read()
            response = self.client.put(
                "/api/v1/users/avatar",
                files={"avatar": ("test.png", f, "image/png")},
                headers={"Authorization": token},
            )

        self.assertEqual(response.status_code, HTTP_200_OK)

        response = self.client.get(
            "/api/v1/users/avatar",
            headers={"Authorization": token},
        )

        self.assertEqual(response.status_code, HTTP_200_OK)
        self.assertEqual(response.headers["Content-Type"], "image/png")

        self.assertEqual(response.content, content)
