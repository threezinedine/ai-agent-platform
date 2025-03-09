import pytest
from ..token_generator import *


def test_generate_token():
    user = TokenGeneratorData(
        username="test-generate-token-username",
        password="test-generate-token-password",
    )

    access_token, refresher_token = generate_token(user)
    assert access_token is not None
    assert isinstance(access_token, str)

    assert refresher_token is not None
    assert isinstance(refresher_token, str)


def test_validate_valid_token():
    user = TokenGeneratorData(
        username="test-validate-valid-token-username",
        password="test-validate-valid-token-password",
    )

    access_token, _ = generate_token(user)

    validated_user = validate_token(access_token)

    assert validated_user is not None
    assert isinstance(validated_user, TokenGeneratorData)
    assert validated_user.username == user.username
    assert validated_user.password == user.password


def test_invalid_token():
    assert validate_token("invalid-token") == TokenGeneratorError.INVALID
