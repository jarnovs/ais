from sqlalchemy import select

from app.core import ModelRepository
from .models import User
from .schemas import UserRead, UserFullRead


class UserRepository(ModelRepository):
    model = User
    schema_read = UserRead

    async def get_by_name(self, name: str) -> UserRead | None:
        obj = await self.session.scalar(select(self.model)
                                        .where(self.model.name == name))
        if obj is not None:
            return self.schema_read.model_validate(obj)

    async def get_full_by_name(self, name: str) -> UserFullRead | None:
        obj = await self.session.scalar(select(self.model)
                                        .where(self.model.name == name))
        if obj is not None:
            return UserFullRead.model_validate(obj)

    async def get_by_token(self, token: str) -> UserRead | None:
        obj = await self.session.scalar(select(self.model)
                                        .where(self.model.token == token))
        if obj is not None:
            return self.schema_read.model_validate(obj)
