from typing import *
from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()


@app.get("/api")
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
