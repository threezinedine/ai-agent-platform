from fastapi import APIRouter, HTTPException, UploadFile, File
from fastapi.responses import FileResponse
from databases import *
from schemas.users import *
from models import *
from sqlmodel import select
from constants import *
from middlewares import ScopeDependency, LanguageDependency
from utils import generate_token, TokenGeneratorError, TokenGeneratorData
from dotenv import load_dotenv
from utils import LanguageService

router = APIRouter(prefix="/api/v1/users", tags=["users", "authenticate"])


@router.post("/register", status_code=HTTP_201_CREATED)
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
    language: str = LanguageDependency,
) -> LoginResponse:
    user = session.exec(select(User).where(User.username == user_info.username)).first()

    if not user:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=LanguageService.Get("USER_NOT_FOUND", language),
        )

    if not user.CheckPassword(user_info.password):
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail=LanguageService.Get("INVALID_PASSWORD", language),
        )

    access_token, refresher_token = generate_token(
        TokenGeneratorData(
            user.username,
            password=user.hashedPassword,
        )
    )

    return LoginResponse(
        accessToken=access_token,
        refreshToken=refresher_token,
        user=UserInfo(
            id=user.id,
            username=user.username,
            email=user.email,
            full_name=user.fullName,
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
    language: str = LanguageDependency,
) -> UserInfo:
    if user is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=LanguageService.Get("USER_NOT_FOUND", language),
        )

    user.Update(user_info)
    session.commit()
    return user


@router.get("/avatar")
def get_avatar(
    session: SessionDependency,
    user: User = ScopeDependency,
    language: str = LanguageDependency,
) -> FileResponse:
    if user is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=LanguageService.Get("USER_NOT_FOUND", language),
        )

    path = None

    if user.avatarUrl is None:
        user.RemoveAvatar()
        session.commit()
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
    elif not os.path.exists(
        os.path.join(os.environ["AVATAR_FOLDER_DIR"], user.avatarUrl)
    ):
        user.RemoveAvatar()
        session.commit()
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], "default.png")
    else:
        path = os.path.join(os.environ["AVATAR_FOLDER_DIR"], user.avatarUrl)

    return FileResponse(path)


@router.put("/avatar")
def set_avatar(
    session: SessionDependency,
    avatar: UploadFile = File(...),
    user: User = ScopeDependency,
    language: str = LanguageDependency,
) -> str:
    if user is None:
        raise HTTPException(
            status_code=HTTP_404_NOT_FOUND,
            detail=LanguageService.Get("USER_NOT_FOUND", language),
        )

    avatar_url = f"{user.username}-{avatar.filename}-avatar.png"
    with open(os.path.join(os.environ["AVATAR_FOLDER_DIR"], avatar_url), "wb") as f:
        f.write(avatar.file.read())

    user.avatarUrl = avatar_url
    session.commit()

    return avatar.filename
