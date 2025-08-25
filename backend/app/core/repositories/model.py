from math import ceil
from sqlalchemy import func, select

from app.core import SessionDep, Base, Schema, SchemaWrite, SchemaQuery
from .abstract import AbstractRepository


class ModelRepository(AbstractRepository):
    model: type[Base]
    schema_read: type[Schema]

    def __init__(self, session: SessionDep) -> None:
        self.session = session

    async def create(self, data: SchemaWrite) -> Schema:
        obj = self.model()
        await data.map_to(self.session, obj)
        self.session.add(obj)
        await self.session.commit()
        await self.session.refresh(obj)
        return self.schema_read.model_validate(obj)

    async def read(self, obj_id: int) -> Schema | None:
        obj = await self.session.get(self.model, obj_id)
        if obj is not None:
            return self.schema_read.model_validate(obj)

    async def update(self, obj_id, data: SchemaWrite) -> Schema:
        obj = await self.session.get(self.model, obj_id)
        if obj is None:
            await data.map_to(self.session, self.model())
        else:
            await data.map_to(self.session, obj)
        await self.session.commit()
        return self.schema_read.model_validate(obj)

    async def delete(self, obj_id: int) -> Schema:
        obj = await self.session.get(self.model, obj_id)
        await self.session.delete(obj)
        await self.session.commit()
        return self.schema_read.model_validate(obj)

    async def list(self, query: SchemaQuery) -> list[Schema]:
        data = (
            (await self.session.execute(query.generate_select(self.model)))
            .scalars()
            .all()
        )
        # for i in data:
        #     await self.session.refresh(i)
        return [self.schema_read.model_validate(i) for i in data]

    async def count(self, query: SchemaQuery) -> int:
        base = query.generate_select(self.model).limit(None).offset(None)
        expr = select(func.count()).select_from(base.subquery())
        result = await self.session.execute(expr)
        total = result.scalar_one()
        return ceil(total / query.limit)