import os
import aiofiles
from uuid import uuid4
from fastapi import APIRouter, File, UploadFile

from app.auth.dependecies import AuthUserDep
from app.auth.exceptions import NotAuthenticated

from .schemas import FileRead
from .config import UPLOAD_DIR, CHUNKS_SIZE
from .service import check_file_extension


router = APIRouter(tags=["Notam"])


@router.post("/notam", response_model=FileRead)
async def upload_file(user: AuthUserDep, file: UploadFile = File(...)):
    if not user:
        raise NotAuthenticated

    check_file_extension(file.filename)
   
    filepath = UPLOAD_DIR / file.filename 

    async with aiofiles.open(filepath, 'wb') as out_file:
        while chunk := await file.read(CHUNKS_SIZE):
            await out_file.write(chunk)

    return FileRead(file=file.filename)


@router.get("/notams", response_model=list[FileRead])
async def list_files(user: AuthUserDep):
    if not user:
        raise NotAuthenticated

    entries = os.listdir(UPLOAD_DIR)
    return [FileRead(file=entry) for entry in entries]


@router.delete("/notam/{filename}", response_model=FileRead)
async def delete_file(user: AuthUserDep, filename: str):
    if not user:
        raise NotAuthenticated

    filepath = UPLOAD_DIR / filename
    if not filepath.exists():
        return {"error": "File not found"}

    os.remove(filepath)
    return FileRead(file=filename)