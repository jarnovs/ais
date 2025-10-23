import os
import aiofiles

from bs4 import BeautifulSoup
from fastapi import APIRouter

from .schemas import EditIssueRead
from .exceptions import ISSUE_NOT_FOUND, DESCRIPTION_NOT_FOUND, P_TAG_NOT_FOUND

from app.core import SessionDep
from app.eaip_issues import EAIPIssue, UPLOAD_DIR


router = APIRouter(tags=["EaipContent"])


@router.patch("/eaip_content/{id}")
async def update_issue(id: int, session: SessionDep, edit_data: EditIssueRead):
    issue = await session.get(EAIPIssue, id)
    if not issue:
        raise ISSUE_NOT_FOUND

    issue_dir = UPLOAD_DIR / issue.folder

    if edit_data.reason_for_change:
        html_file = issue_dir / "html/UC-cover-en-GB.html"

        async with aiofiles.open(html_file, "r", encoding="utf-8") as f:
            contents = await f.read()

        soup = BeautifulSoup(contents, "html.parser")

        description = soup.find("h4", string="Description")
        if not description:
            raise DESCRIPTION_NOT_FOUND

        next_p = description.find_next("p", class_="AmdtCoverSectionContent")
        if not next_p:
            raise P_TAG_NOT_FOUND

        next_p.string = edit_data.reason_for_change
        print("✅ Текст успешно изменён.")

        async with aiofiles.open(html_file, "w", encoding="utf-8") as f:
            await f.write(str(soup))

    return {"message": "Issue обновлён успешно"}
