from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from datetime import date
from enum import Enum

from app.core import Base


class EAIPStatus(Enum):
    ACTIVE = "active"
    FUTURE = "future"
    ARCHIVED = "archived"
    HIDDEN = "hidden"

class EAIPIssue(Base):
    __tablename__ = "eaip_issue"

    id: Mapped[int] = mapped_column(primary_key=True)
    effective_date: Mapped[date]
    publication_date: Mapped[date]
    reason_for_change: Mapped[str] = mapped_column(String(255))
    status: Mapped[EAIPStatus]
    folder: Mapped[str] = mapped_column(String(512))


