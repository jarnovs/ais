from bcrypt import gensalt, hashpw, checkpw


def hash_password(password: str) -> str:
    return hashpw(password.encode(), gensalt()).decode()


async def check_password(password: str, hashed_password: str) -> bool:
    return checkpw(password.encode(), hashed_password.encode())

