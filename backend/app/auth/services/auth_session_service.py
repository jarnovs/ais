from typing import Annotated

from fastapi import Depends

from app.core.exceptions import SchemaError, SchemaException
from ..dependecies import AuthUserDep, TokenDep
from ..schemas import AuthSessionInitCreate, AuthSessionCreate
from ..exceptions import InvalidAuthData
from ..repository import AuthSessionRepository
from .auth_model_service import AuthModelService
from app.users.repository import UserRepository
from app.users.utils import check_password


class AuthSessionService(AuthModelService):
    def __init__(
        self,
        repo: Annotated[AuthSessionRepository, Depends()],
        auth_user: AuthUserDep,
        user_repo: Annotated[UserRepository, Depends()],
        token: TokenDep
    ):
        super().__init__(repo, auth_user)
        self.user_repo = user_repo
        self.token = token

    async def create(self, data: AuthSessionInitCreate):
        user = await self.user_repo.get_full_by_name(data.username)
        if user is None:
            raise InvalidAuthData
        if not await check_password(data.password, user.password_hash):
            raise InvalidAuthData
        return await self.repo.create(user)

    async def get_auth(self):
        await self.require_auth()
        return self.auth_user

    async def logout_session(self):
        await self.require_auth()
        obj = await self.repo.delete_by_token(self.token)

    async def logout_user(self):
        await self.require_auth()
        obj = await self.repo.delete_by_user_id(self.auth_user.id)

