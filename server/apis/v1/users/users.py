from fastapi import APIRouter
from databases import *
from schemas.users import *
from models import *

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
