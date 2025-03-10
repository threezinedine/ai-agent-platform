import os
import sys
from dotenv import load_dotenv
from utils import LanguageService


def pytest_sessionstart(session):
    LanguageService.Load()


def pytest_sessionfinish(session, exitstatus):
    # remove all the files in the avatar folder except the default.png
    load_dotenv()
    avatar_folder = os.environ["AVATAR_FOLDER_DIR"]
    for file in os.listdir(avatar_folder):
        if file != "default.png":
            os.remove(os.path.join(avatar_folder, file))


sys.path.append(os.path.join(os.path.dirname(__file__), ""))
