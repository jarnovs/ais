import os
import aiofiles
from zipfile import ZipFile, BadZipFile
from .config import UPLOAD_DIR, CHUNKS_SIZE
from .service import check_file_extension, delete_tmp, delete_dir
from .exceptions import NotOneFolderError, FolderNameExistError, FileIsNotZipError
from .schemas import EAIPIssueRead
from fastapi import APIRouter, File, Form, UploadFile, HTTPException
from sqlalchemy import select
from typing import Annotated, Optional
from datetime import date
from app.core import SessionDep
from .models import EAIPIssue, EAIPStatus

router = APIRouter(tags=["EAIPIssues"])

@router.post("/eaip_issues/",response_model=EAIPIssueRead)
async def create_issue(
    session: SessionDep,
    effective_date: date = Form(...),
    publication_date: date = Form(...),
    reason_for_change: str = Form(...),
    status: EAIPStatus = Form(...),
    file: UploadFile = File(...)
):
    ###
    ext = await check_file_extension(file.filename)
    
    foldername = f"{effective_date}-AIRAC"
    final_dir = UPLOAD_DIR / foldername
    tmp_dir = UPLOAD_DIR / f"{foldername}.tmp"
    zip_file = UPLOAD_DIR / f"{foldername}{ext}"

    async with aiofiles.open(zip_file, 'wb') as out_file:
        while chunk := await file.read(CHUNKS_SIZE):
            await out_file.write(chunk)
    # Unzip
    try:
        with ZipFile(zip_file, "r") as zip:
            zip.extractall(tmp_dir)
    except BadZipFile:
        await delete_tmp(tmp_dir, zip_file)
        raise FileIsNotZipError
    
    # Validate if one folder inside zip
    subfolders = [folder.path for folder in os.scandir(tmp_dir) if folder.is_dir()]
    if len(subfolders) != 1: 
        await delete_tmp(tmp_dir, zip_file)
        raise NotOneFolderError

    # Save folder in final directory
    [folder] = subfolders
    try:
        os.rename(folder, final_dir)
    except:
        await delete_tmp(tmp_dir, zip_file)
        raise FolderNameExistError 
    
    await delete_tmp(tmp_dir, zip_file)
    #####

    data = EAIPIssue(
            effective_date=effective_date,
            publication_date=publication_date,
            reason_for_change=reason_for_change,
            status=status,
            folder=foldername)
    session.add(data)
    await session.commit()
    await session.refresh(data)
    return data 


@router.get("/eaip_issues/", response_model=list[EAIPIssueRead])
async def list_issues(session: SessionDep, status: EAIPStatus | None = None):
    query = select(EAIPIssue)
    if status is not None:
        query = query.where(EAIPIssue.status == status)
    result = await session.execute(query)
    eaip_issues = result.scalars().all()
    return eaip_issues


@router.get("/eaip_issues/{id}", response_model=EAIPIssueRead)
async def read_issue(id: int, session: SessionDep):
    eaip_issue = await session.get(EAIPIssue, id)
    if not eaip_issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    return eaip_issue


@router.patch("/eaip_issues/{id}", response_model=EAIPIssueRead)
async def update_issue(
    id: int,
    session: SessionDep,
    effective_date: Optional[date] = Form(None),
    publication_date: Optional[date] = Form(None),
    reason_for_change: Optional[str] = Form(None),
    status: Optional[EAIPStatus] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    issue = await session.get(EAIPIssue, id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    
    if effective_date is not None:
        old_folder_dir = UPLOAD_DIR / issue.folder
        foldername = f"{effective_date}-AIRAC"
        new_folder_dir = UPLOAD_DIR / foldername 
        os.rename(old_folder_dir, new_folder_dir)
        issue.folder = foldername
        issue.effective_date = effective_date

    if publication_date is not None:
        issue.publication_date = publication_date

    if reason_for_change is not None:
        issue.reason_for_change = reason_for_change

    if status is not None:
        issue.status = status

    if file is not None:
        ext = await check_file_extension(file.filename)
        foldername = issue.folder 
        final_dir = UPLOAD_DIR / foldername
        tmp_dir = UPLOAD_DIR / f"{foldername}.tmp"
        zip_file = UPLOAD_DIR / f"{foldername}{ext}"

        async with aiofiles.open(zip_file, 'wb') as out_file:
            while chunk := await file.read(CHUNKS_SIZE):
                await out_file.write(chunk)
        # Unzip
        try:
            with ZipFile(zip_file, "r") as zip:
                zip.extractall(tmp_dir)
        except BadZipFile:
            await delete_tmp(tmp_dir, zip_file)
            raise FileIsNotZipError
        
        # Validate if one folder inside zip
        subfolders = [folder.path for folder in os.scandir(tmp_dir) if folder.is_dir()]
        if len(subfolders) != 1: 
            await delete_tmp(tmp_dir, zip_file)
            raise NotOneFolderError

        # Save folder in final directory
        [folder] = subfolders
        try:
            await delete_dir(final_dir)
            os.rename(folder, final_dir)
        except:
            await delete_tmp(tmp_dir, zip_file)
            raise FolderNameExistError 
        
        await delete_tmp(tmp_dir, zip_file)


    session.add(issue)
    await session.commit()
    await session.refresh(issue)
    return issue


@router.delete("/eaip_issues/{id}")
async def delete_issue(id: int, session: SessionDep):
    issue = await session.get(EAIPIssue, id)
    if not issue:
        raise HTTPException(status_code=404, detail="Issue not found")
    await delete_dir(UPLOAD_DIR / issue.folder)
    await session.delete(issue)
    await session.commit()
    return {"ok": True}
