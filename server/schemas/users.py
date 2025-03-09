from typing import *
from pydantic import BaseModel


class UserInfo(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    fullName: Optional[str] = None
    phone: Optional[str] = None


class LoginResponse(BaseModel):
    accessToken: str
    refreshToken: str
    user: UserInfo


class UpdateUserInfo(BaseModel):
    fullName: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None


class UserLoginInfo(BaseModel):
    username: str
    password: str
