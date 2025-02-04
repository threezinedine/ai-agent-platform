import pytest
from ..token_generator import *


def test_generate_token():
    user = TokenGeneratorData(
        username="test-generate-token-username",
        password="test-generate-token-password",
    )

    token = generate_token(user)
    assert token is not None
    assert isinstance(token, str)


def test_validate_valid_token():
    user = TokenGeneratorData(
        username="test-validate-valid-token-username",
        password="test-validate-valid-token-password",
    )

    token = generate_token(user)

    validated_user = validate_token(token)

    assert validated_user is not None
    assert isinstance(validated_user, TokenGeneratorData)
    assert validated_user.username == user.username
    assert validated_user.password == user.password


def test_invalid_token():
    assert validate_token("invalid-token") == TokenGeneratorError.INVALID
