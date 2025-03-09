from sqlmodel import SQLModel, Field
from datetime import datetime
from schemas import *
from utils import *
import os


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    email: str = Field(unique=False, nullable=True)
    fullName: str = Field(nullable=True)
    hashedPassword: str = Field(max_length=100)
    avatarUrl: str = Field(nullable=True)
    phone: str = Field(nullable=True)
    verified: bool = Field(default=False)
    createdAt: datetime = Field(default=datetime.now())

    @staticmethod
    def CreateFromInfo(user_info: UserLoginInfo) -> "User":
        return User(
            username=user_info.username,
            hashedPassword=hash_password(user_info.password),
        )

    def CheckPassword(self, password: str) -> bool:
        return verify_password(password, self.hashedPassword)

    def Update(self, user_info: UpdateUserInfo) -> None:
        if user_info.fullName:
            self.fullName = user_info.fullName
        if user_info.email:
            self.email = user_info.email
        if user_info.phone:
            self.phone = user_info.phone

    def RemoveAvatar(self) -> None:
        self.avatarUrl = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
