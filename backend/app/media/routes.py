import aiofiles
from uuid import uuid4
from fastapi import APIRouter, File, UploadFile

from app.auth.dependecies import AuthUserDep
from app.auth.exceptions import NotAuthenticated

from .schemas import FileRead
from .config import UPLOAD_DIR, CHUNKS_SIZE
from .service import check_file_extension


router = APIRouter(tags=["Media"])


@router.post("/media", response_model=FileRead)
async def upload_file(user: AuthUserDep, file: UploadFile = File(...)):
    if not user:
        raise NotAuthenticated

    ext = check_file_extension(file.filename)
   
    hashed_filename = f"{uuid4()}{ext}"
    filepath = UPLOAD_DIR / hashed_filename

    async with aiofiles.open(filepath, 'wb') as out_file:
        while chunk := await file.read(CHUNKS_SIZE):
            await out_file.write(chunk)

    return FileRead(file=hashed_filename)   