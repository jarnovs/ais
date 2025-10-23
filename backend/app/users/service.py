from typing import Annotated
from app.core import ModelService

from fastapi import Depends

from app.auth.services import AuthModelService
from app.auth.dependecies import AuthUserDep
from app.core import SchemaError, SchemaException, Unset
from .utils import hash_password

from .schemas import UserInitCreate, UserInitUpdate, UserRead, UserCreate, UserUpdate
from .repository import UserRepository


class UserService(AuthModelService):
    def __init__(
        self, repo: Annotated[UserRepository, Depends()], auth_user: AuthUserDep
    ):
        super().__init__(repo, auth_user)

    async def create(self, data: UserInitCreate):
        await self.require_auth()
        if await self.repo.get_by_name(data.name):
            raise SchemaException([SchemaError(loc="body.name", msg="Имя занято")])
        obj = UserCreate(name=data.name, password_hash=data.password)
        return await super().create(obj)

    async def read(self, obj_id: int):
        await self.require_auth()
        return await super().read(obj_id)

    async def update(self, obj_id: int, data: UserInitUpdate):
        await self.require_auth()
        obj = await self.read(obj_id)
        found_name = await self.repo.get_by_name(data.name)
        if data.name is not Unset and found_name:
            if found_name.id != obj_id:
                raise SchemaException([SchemaError(loc="body.name", msg="Имя занято")])

        update = UserUpdate()
        for field in data.model_fields_set:
            if field == "password":
                setattr(update, "password_hash", hash_password(getattr(data, field)))
                continue
            setattr(update, field, getattr(data, field))
        return await super().update(obj_id, update)

    async def delete(self, obj_id):
        await self.require_auth()
        return await super().delete(obj_id)
