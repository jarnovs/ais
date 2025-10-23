from fastapi import HTTPException
from starlette.status import HTTP_400_BAD_REQUEST
from .config import ALLOWED_FILE_EXTENSIONS


FileNotValidError = HTTPException(
    HTTP_400_BAD_REQUEST, f"Недопустимый тип файла. Используйте: {ALLOWED_FILE_EXTENSIONS}"
)

NotOneFolderError = HTTPException(HTTP_400_BAD_REQUEST, "ZIP должен содержать ровно одну корневую папку")

FolderNameExistError = HTTPException(HTTP_400_BAD_REQUEST, "Переименование папки не удалось. Возможно, папка с таким именем уже существует")

FileIsNotZipError = HTTPException(HTTP_400_BAD_REQUEST, "Файл не является ZIP-архивом")
