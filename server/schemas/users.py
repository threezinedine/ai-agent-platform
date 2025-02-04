from typing import *
from pydantic import BaseModel


class UserInfo(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None


class UserLoginInfo(BaseModel):
    username: str
    password: str
