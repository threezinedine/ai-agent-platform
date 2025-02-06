import os
import sys
from dotenv import load_dotenv


def pytest_sessionstart(session):
    pass


sys.path.append(os.path.join(os.path.dirname(__file__), ""))
