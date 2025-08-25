from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST
from .config import ALLOWED_FILE_EXTENSIONS


FileNotValidError = HTTPException(
    HTTP_400_BAD_REQUEST, f"File extension not allowed. Use: {ALLOWED_FILE_EXTENSIONS}"
)

NotOneFolderError = HTTPException(HTTP_400_BAD_REQUEST, "ZIP must contain exactly one root folder")

FolderNameExistError = HTTPException(HTTP_400_BAD_REQUEST, "Folder renaming failed. Probably folder with this name already exist")

FileIsNotZipError = HTTPException(HTTP_400_BAD_REQUEST, "File is not zip")
