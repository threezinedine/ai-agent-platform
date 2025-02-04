from fastapi import APIRouter, HTTPException
from databases import *
from schemas.users import *
from models import *
from sqlmodel import select
from constants import *

router = APIRouter(prefix="/api/v1/users", tags=["users", "authenticate"])


@router.post("/register")
def register_new_user(
    user_info: UserLogin,
    session: SessionDependency,
) -> User:
    user = User.CreateFromInfo(user_info)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post("/login")
def login_user(
    user_info: UserLogin,
    session: SessionDependency,
) -> User:
    user = session.exec(select(User).where(User.username == user_info.username)).first()

    if not user:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    if not user.CheckPassword(user_info.password):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Invalid password",
        )

    return User(username=user_info.username)
