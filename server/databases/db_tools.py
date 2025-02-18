import os
from typing import *
from sqlmodel import Session, create_engine, SQLModel, select
from fastapi import Depends
from dotenv import load_dotenv
import logging

load_dotenv()

database_url = os.environ.get("DATABASE_URL", "sqlite:///test.db")
logging.info(f"Database URL: {database_url}")

connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
engine = create_engine(database_url, echo=True, connect_args=connect_args)
test_engine = create_engine(
    "sqlite:///pytest-test.db",
    echo=True,
    connect_args={"check_same_thread": False},
)

from models import *


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def create_test_db_and_tables():
    SQLModel.metadata.create_all(test_engine)


def drop_db_and_tables():
    SQLModel.metadata.drop_all(engine)


def drop_test_db_and_tables():
    SQLModel.metadata.drop_all(test_engine)


def get_session():
    with Session(engine) as session:
        yield session


def get_test_session():
    with Session(test_engine) as session:
        yield session


def create_default_users():
    with Session(engine) as session:
        # check if the admin user exists
        admin_username = os.environ.get("ADMIN_USERNAME", "admin")
        admin_password = os.environ.get("ADMIN_PASSWORD", "admin")

        admin = session.exec(
            select(User).where(User.username == admin_username)
        ).first()
        if not admin:
            admin = User(
                username=admin_username,
                hashedPassword=hash_password(admin_password),
            )

            session.add(admin)
            session.commit()
            session.refresh(admin)

        # check if the test user exists
        user_username = os.environ.get("USER_USERNAME", "user")
        user_password = os.environ.get("USER_PASSWORD", "user")

        test_user = session.exec(
            select(User).where(User.username == user_username)
        ).first()
        if not test_user:
            test_user = User(
                username=user_username,
                hashedPassword=hash_password(user_password),
            )

            session.add(test_user)
            session.commit()
            session.refresh(test_user)


SessionDependency = Annotated[Session, Depends(get_session)]
