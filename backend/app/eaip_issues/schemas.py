from pydantic import BaseModel
from datetime import date

from .models import EAIPStatus


class EAIPIssueRead(BaseModel):
    id: int | None
    effective_date: date
    publication_date: date
    reason_for_change: str
    status: EAIPStatus
    folder: str
