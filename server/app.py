from typing import *
from fastapi import FastAPI
from dotenv import load_dotenv
import os
from contextlib import asynccontextmanager
from databases.db_tools import create_db_and_tables

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
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
