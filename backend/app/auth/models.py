from uuid import UUID, uuid4

from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core import Base


class AuthSession(Base):
    __tablename__ = "auth_session"

    id: Mapped[int] = mapped_column(primary_key=True)
    token: Mapped[UUID] = mapped_column(index=True, default=uuid4)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))
    user: Mapped["User"] = relationship(back_populates="auth_sessions",
                                        lazy="selectin")
