import os
import shutil
from pathlib import Path

from .exceptions import FileNotValidError
from .config import ALLOWED_FILE_EXTENSIONS


async def check_file_extension(filename: str):
    ext = Path(filename).suffix.lower()
    if ext not in ALLOWED_FILE_EXTENSIONS:
        raise FileNotValidError
    return ext

async def delete_tmp(tmp_dir, zip_file):
    shutil.rmtree(tmp_dir)
    os.remove(zip_file)

async def delete_dir(dir):
    shutil.rmtree(dir)
