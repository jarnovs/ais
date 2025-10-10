from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST
from .config import ALLOWED_FILE_EXTENSIONS


FileNotValidError = HTTPException(
    HTTP_400_BAD_REQUEST, f"File extension not allowed. Use: {ALLOWED_FILE_EXTENSIONS}"
)
