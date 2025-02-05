from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from databases import *
from schemas.users import *
from models import *
from sqlmodel import select
from constants import *
from .get_user_depend import ScopeDependency
from utils import *

router = APIRouter(prefix="/api/v1/users", tags=["users", "authenticate"])


@router.post("/register")
def register_new_user(
    user_info: UserLoginInfo,
    session: SessionDependency,
) -> UserInfo:
    user = User.CreateFromInfo(user_info)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


@router.post("/login")
def login_user(
    user_info: UserLoginInfo,
    session: SessionDependency,
) -> LoginResponse:
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

    return LoginResponse(
        token=generate_token(
            TokenGeneratorData(
                user.username,
                password=user.hashed_password,
            )
        ),
        user=UserInfo(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.full_name,
        ),
    )


@router.get("/me")
def get_user_info(
    user: User = ScopeDependency,
) -> UserInfo:
    return user


@router.put("/me")
def update_user_info(
    user_info: UpdateUserInfo,
    session: SessionDependency,
    user: User = ScopeDependency,
) -> UserInfo:
    if user is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    user.Update(user_info)
    session.commit()
    return user


@router.get("/avatar")
def get_avatar(
    session: SessionDependency,
    user: User = ScopeDependency,
) -> FileResponse:
    if user is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    path = None

    if user.avatar_url is None:
        user.RemoveAvatar()
        session.commit()
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
    elif not os.path.exists(
        os.path.join(os.environ["AVATAR_FOLDER_DIR"], user.avatar_url)
    ):
        user.RemoveAvatar()
        session.commit()
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
    else:
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], user.avatar_url)

    return FileResponse(path)
