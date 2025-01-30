from pydantic import BaseModel


class User(BaseModel):
    username: str
    email: str
    full_name: str = None


class UserLogin(BaseModel):
    username: str
    password: str
