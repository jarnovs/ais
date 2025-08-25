from typing import Annotated

from fastapi import Depends, Cookie

from app.core import ConfigDep
from app.users.schemas import UserRead
from .repository import AuthSessionRepository


async def get_token(token: Annotated[str | None, Cookie()] = None):
    return token


TokenDep = Annotated[str, Depends(get_token)]


async def get_auth_user(
    repo: Annotated[AuthSessionRepository, Depends()],
    token: TokenDep,
    config: ConfigDep
) -> UserRead | None:
    auth = await repo.get_by_token(token)
    if auth is not None:
        return auth.user


AuthUserDep = Annotated[UserRead | None, Depends(get_auth_user)]


