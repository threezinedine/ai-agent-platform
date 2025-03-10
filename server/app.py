from typing import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from databases.db_tools import create_db_and_tables, create_default_users
import shutil
import logging
from utils import LanguageService

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    create_default_users()

    LanguageService.Load(os.path.dirname(__file__))

    avatar_dir = os.environ["AVATAR_FOLDER_DIR"]
    if avatar_dir is None:
        raise ValueError("AVATAR_FOLDER_DIR is not set")

    if not os.path.exists(avatar_dir):
        logging.info(f"Avatar directory {avatar_dir} does not exist. Creating it...")
        os.makedirs(avatar_dir)
        logging.info(f"Avatar directory {avatar_dir} created.")

    files = os.listdir(avatar_dir)
    if "default.png" not in files:
        logging.info(f"Default avatar not found. Creating it...")
        shutil.copy(
            "assets/default.png",
            os.path.join(avatar_dir, "default.png"),
        )
        logging.info(f"Default avatar created.")

    yield


app = FastAPI(lifespan=lifespan)

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


from apis.v1.users import router as users_router

app.include_router(users_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app:app",
        host=os.environ.get("HOST", "localhost"),
        port=int(os.environ.get("PORT", 8000)),
        reload=os.environ.get("ENV", "development") == "development",
    )
