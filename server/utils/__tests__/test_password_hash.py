import unittest
from utils import *
import random


class TestPasswordHash(unittest.TestCase):
    def test_hash_password(self) -> None:
        # create random password with 10 characters
        charHubs = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

        password = "".join(random.choice(charHubs) for i in range(10))

        hashed_password = hash_password(password)

        self.assertTrue(verify_password(password, hashed_password))
