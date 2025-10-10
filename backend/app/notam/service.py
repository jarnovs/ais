from pathlib import Path
from .config import ALLOWED_FILE_EXTENSIONS
from .exceptions import FileNotValidError


def check_file_extension(filename: str):
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_FILE_EXTENSIONS:
        raise FileNotValidError
    return ext
    