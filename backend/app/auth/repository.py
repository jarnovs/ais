from sqlalchemy import delete, select

from app.core import ModelRepository
from app.users.schemas import UserFullRead
from .models import AuthSession
from .schemas import AuthSessionRead, AuthSessionCreate


class AuthSessionRepository(ModelRepository):
    model = AuthSession
    schema_read = AuthSessionRead

    async def create(self, data: UserFullRead):
        obj = AuthSessionCreate(user_id=data.id)
        return await super().create(obj)

    async def get_by_token(self, token: str):
        obj = await self.session.scalar(select(self.model)
                                        .where(self.model.token == token))
        if obj is not None:
            return self.schema_read.model_validate(obj)

    async def delete_by_token(self, token: str):
        await self.session.execute(delete(self.model)
                                   .where(self.model.token == token))
        await self.session.commit()

    async def delete_by_user_id(self, user_id: int):
        await self.session.execute(delete(self.model)
                                   .where(self.model.user_id == user_id))
        await self.session.commit()
