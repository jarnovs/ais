from typing import Annotated
from pydantic import AfterValidator, Field

from app.core import Schema, SchemaWrite, Unset
from .utils import hash_password
from .constants import (
    USERNAME_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH
)
from .models import User


username_field = Annotated[
    str,
    Field(
        title="Имя пользователя",
        min_length=USERNAME_MIN_LENGTH,
        max_length=USERNAME_MAX_LENGTH,
        description="Используется в качестве логина"
    )
]


password_field = Annotated[
    str,
    Field(
        title="Пароль",
        min_length=PASSWORD_MIN_LENGTH,
        max_length=PASSWORD_MAX_LENGTH,
    )
]


hashed_password = Annotated[str, AfterValidator(hash_password)]


class UserInitCreate(Schema):
    name: username_field
    password: password_field


class UserCreate(SchemaWrite):
    __model__ = User

    name: str
    password_hash: hashed_password


class UserRead(Schema):
    id: int
    name: Annotated[str, username_field]


class UserFullRead(UserRead):
    password_hash: str


class UserInitUpdate(Schema):
    name: password_field = Unset
    password: password_field = Unset


class UserUpdate(SchemaWrite):
    __model__ = User

    name: str = Unset
    password_hash: hashed_password = Unset
