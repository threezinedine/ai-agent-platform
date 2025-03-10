from fastapi import Depends, Header, HTTPException
from models import *
from databases import SessionDependency
from constants import *
from utils import *
from sqlmodel import select
from .language import LanguageDependency
from utils import LanguageService


def get_user_depend(
    session: SessionDependency,
    authorization: str = Header(None),
    lang: str = LanguageDependency,
) -> User:
    if not authorization:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )

    user = validate_token(authorization)

    if not isinstance(user, TokenGeneratorData):
        if user == TokenGeneratorError.INVALID:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail=LanguageService.Get("INVALID_TOKEN", lang),
            )
        elif user == TokenGeneratorError.UNAUTHORIZED:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail=LanguageService.Get("UNAUTHORIZED", lang),
            )
        else:
            raise HTTPException(
                status_code=HTTP_401_UNAUTHORIZED,
                detail=LanguageService.Get("TOKEN_EXPIRED", lang),
            )

    return session.exec(select(User).where(User.username == user.username)).first()


ScopeDependency = Depends(get_user_depend)
