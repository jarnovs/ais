from typing import Annotated
from uuid import UUID

from pydantic import BeforeValidator, Field

from app.users.schemas import username_field, password_field, UserRead
from app.core import SchemaWrite, Schema
from .models import AuthSession


class AuthSessionInitCreate(Schema):
    username: str = username_field
    password: str = password_field


class AuthSessionCreate(SchemaWrite):
    __model__ = AuthSession

    user_id: int


class AuthSessionRead(Schema):
    token: Annotated[str, BeforeValidator(lambda v: str(v))]
    user: UserRead
