from typing import Optional
from pydantic import BaseModel


class EditIssueRead(BaseModel):
    reason_for_change: Optional[str] = None
