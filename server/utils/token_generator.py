from models import *
from typing import *
from dataclasses import dataclass, asdict
from enum import Enum, auto
import json


class TokenGeneratorError(Enum):
    INVALID = auto()
    UNAUTHORIZED = auto()
    EXPIRED = auto()


@dataclass
class TokenGeneratorData:
    username: str
    password: str


def generate_token(data: TokenGeneratorData) -> str:
    return json.dumps(asdict(data))


def validate_token(token: str) -> Union[TokenGeneratorError, TokenGeneratorData]:
    try:
        data = json.loads(token)
        return TokenGeneratorData(**data)
    except json.JSONDecodeError:
        return TokenGeneratorError.INVALID
