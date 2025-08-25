from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core import Base
from .constants import USERNAME_MAX_LENGTH, PASSWORD_MAX_LENGTH


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(USERNAME_MAX_LENGTH), unique=True)
    password_hash: Mapped[str] = mapped_column(String(PASSWORD_MAX_LENGTH))
    auth_sessions: Mapped[list["AuthSession"]] =  relationship(
        back_populates="user", cascade="all, delete-orphan"
    )
