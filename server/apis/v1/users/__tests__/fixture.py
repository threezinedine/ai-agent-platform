from fastapi.testclient import TestClient


def create_and_login_user(client: TestClient, username: str, password: str) -> str:
    """
    Create an user and login with this user.

    Args:
        client (TestClient): TestClient
        username (str): username
        password (str): password

    Returns:
        str: access token of the user
        str: refresh token of the user
    """

    client.post(
        "/api/v1/users/register",
        json={
            "username": username,
            "password": password,
        },
    )

    response = client.post(
        "/api/v1/users/login",
        json={
            "username": username,
            "password": password,
        },
    )

    return response.json()["accessToken"], response.json()["refreshToken"]
