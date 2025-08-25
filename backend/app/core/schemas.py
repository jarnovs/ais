from typing import Any
from enum import Enum
from typing import ClassVar

from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .database import Base
from .exceptions import SchemaException, SchemaError


class UnsetType(Any):
    pass


Unset = UnsetType()


class OrderBy(str, Enum):
    none = ''
    asc = "asc"
    desc = "desc"


class Schema(BaseModel, from_attributes=True):
    __model__: ClassVar[type[Base]]


class SchemaWrite(Schema):
    async def map_to(
        self,
        session: AsyncSession,
        target: Base
    ) -> None:
        for key in self.model_fields_set:
            value = getattr(self, key)
            obj = None
            obj_id = getattr(value, "id", None)
            if obj_id and isinstance(value, SchemaRef):
                obj = await value.resolve(session)
            elif isinstance(value, Schema):
                obj = value.__model__()
            if isinstance(value, SchemaWrite): 
                await value.map_to(session, obj)
            elif isinstance(value, list):
                # NOTE: this hack was written on intuition
                # TODO: write tests
                new = []
                for i in value:
                    obj_id = getattr(i, "id", None)
                    if obj_id and isinstance(i, SchemaRef):
                        obj = await i.resolve(session)
                    else:
                        obj = i.__model__()
                    if isinstance(i, SchemaWrite):
                        await i.map_to(session, obj)
                    new.append(obj)


                old = getattr(target, key)
                diff = old != new
                if diff:
                    for i in old:
                        if i not in new:
                            old.remove(i)
                    for i in new:
                        if i not in old:
                            old.append(i)
                continue
            setattr(target, key, obj or value)
            


class SchemaRef(Schema):
    id: int = 0

    async def resolve(self, session: AsyncSession) -> Base:
        obj = await session.get(self.__model__, self.id)
        if not obj:
            raise SchemaException([
                SchemaError(loc="body.id", msg="Запись с таким ID не найдена")
            ])
        return obj


class SchemaQuery(Schema):
    limit: int = Field(10, le=1000, title="Лимит")
    offset: int = Field(0, title="Смещение")
    order_by_id: OrderBy = Field(OrderBy.asc, title="Сортировка по ID")

    def generate_select(self, model):
        expr = select(model).limit(self.limit).offset(self.offset)

        match self.order_by_id:
            case OrderBy.asc:
                expr = expr.order_by(model.id.asc())
            case OrderBy.desc:
                expr = expr.order_by(model.id.desc())

        return expr
