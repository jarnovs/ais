from bcrypt import gensalt, hashpw, checkpw


def hash_password(password):
    return hashpw(password.encode("utf-8"), gensalt()).decode()

def check_password(password, hashed_password) -> bool:
    return checkpw(password.encode("utf-8"), hashed_password)
