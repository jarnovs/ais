from typing import Annotated

from fastapi import Depends
from app.core import ModelService
from ..dependecies import AuthUserDep
from ..exceptions import NotAuthenticated
from app.core.repositories.model import ModelRepository


class AuthModelService(ModelService):
    def __init__(self,
        repo: Annotated[ModelRepository, Depends()],
        auth_user: AuthUserDep
    ):
        super().__init__(repo)
        self.auth_user = auth_user

    async def require_auth(self):
        if self.auth_user is None:
            raise NotAuthenticated
