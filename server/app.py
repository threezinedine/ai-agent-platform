from typing import *
from fastapi import FastAPI
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from databases.db_tools import create_db_and_tables
import shutil
import logging

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()

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


from apis.v1.users import router as users_router

app.include_router(users_router)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app:app",
        host=os.environ.get("HOST", "localhost"),
        port=int(os.environ.get("PORT", 8000)),
        reload=os.environ.get("ENV", "development") == "development",
    )
