import os
from typing import *
from sqlmodel import Session, create_engine, SQLModel
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


SessionDependency = Annotated[Session, Depends(get_session)]
