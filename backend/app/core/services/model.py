from typing import Annotated

from fastapi import Depends

from app.core import (
    ModelRepository, NotFoundException, SchemaWrite,
    SchemaQuery, Schema, SchemaException, SchemaError
)
from .abstract import AbstractService


class ModelService(AbstractService):
    def __init__(
        self,
        repo: Annotated[ModelRepository, Depends()]
    ) -> None:
        self.repo = repo

    async def create(self, data: SchemaWrite) -> Schema:
        return await self.repo.create(data)

    async def read(self, obj_id: int) -> Schema:
        obj = await self.repo.read(obj_id)
        if obj is None:
            raise NotFoundException()
        return obj

    async def update(self, obj_id: int, data: SchemaWrite) -> Schema:
        obj = await self.read(obj_id)
        return await self.repo.update(obj_id, data)

    async def delete(self, obj_id: int) -> Schema:
        obj = await self.read(obj_id)
        return await self.repo.delete(obj_id)

    async def list(self, query: SchemaQuery) -> list[Schema]:
        return await self.repo.list(query)
    
    async def count(self, query: SchemaQuery) -> int:
        return await self.repo.count(query)
