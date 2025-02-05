from sqlmodel import SQLModel, Field
from datetime import datetime
from schemas import *
from utils import *
import os


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=False, nullable=True)
    full_name: str = Field(nullable=True)
    hashed_password: str = Field(max_length=100)
    avatar_url: str = Field(nullable=True)
    verified: bool = Field(default=False)
    created_at: datetime = Field(default=datetime.now())

    @staticmethod
    def CreateFromInfo(user_info: UserLoginInfo) -> "User":
        return User(
            username=user_info.username,
            hashed_password=hash_password(user_info.password),
        )

    def CheckPassword(self, password: str) -> bool:
        return verify_password(password, self.hashed_password)

    def Update(self, user_info: UpdateUserInfo) -> None:
        if user_info.full_name:
            self.full_name = user_info.full_name
        if user_info.email:
            self.email = user_info.email

    def RemoveAvatar(self) -> None:
        self.avatar_url = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
