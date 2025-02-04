def hash_password(password: str) -> str:
    return password


def verify_password(password: str, hashed_password: str) -> bool:
    return password == hashed_password
