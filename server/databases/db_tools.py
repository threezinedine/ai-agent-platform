import os
from typing import *
from sqlmodel import Session, create_engine, select, SQLModel
from fastapi import Depends
from dotenv import load_dotenv
import logging

load_dotenv()

database_url = os.environ.get("DATABASE_URL", "sqlite:///test.db")
logging.info(f"Database URL: {database_url}")

connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
engine = create_engine(database_url, echo=True, connect_args=connect_args)

from models import *


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


SessionDependency = Annotated[Session, Depends(get_session)]
