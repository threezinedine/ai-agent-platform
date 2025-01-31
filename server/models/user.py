from sqlmodel import SQLModel, Field
from datetime import datetime
from schemas import UserLogin
from utils import *


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=False, nullable=True)
    hashed_password: str = Field(max_length=100)
    verified: bool = Field(default=False)
    created_at: datetime = Field(default=datetime.now())

    @staticmethod
    def CreateFromInfo(user_info: UserLogin) -> "User":
        return User(
            username=user_info.username,
            hashed_password=hash_password(user_info.password),
        )
