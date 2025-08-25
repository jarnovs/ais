import logging
from abc import ABC
from typing import Annotated

from fastapi import APIRouter, Depends, Response
from pydantic import BaseModel

from app.core import SchemaQuery, HTTPSchemaError
from .services.model import ModelService


logger = logging.getLogger(__name__)


class Controller(ABC):
    schema_create: type[BaseModel]
    schema_read: type[BaseModel]
    schema_update: type[BaseModel]
    schema_query: type[SchemaQuery] = SchemaQuery
    service: type[ModelService]

    @classmethod
    def register(cls, router: APIRouter) -> None:
        if not hasattr(cls, "service"):
            raise AttributeError(f"{cls} must have 'service'")

        if not hasattr(cls, "schema_read"):
            raise AttributeError(f"{cls} must have 'schema_read'")

        if cls.schema_create:
            @router.post('', responses={
                400: {"model": HTTPSchemaError,
                      "description": "Schema Error (business logic)"}
            })
            async def create(
                data: cls.schema_create,
                service: Annotated[cls.service, Depends()]
            ) -> cls.schema_read:
                logger.info(
                    f"{cls.service.__name__}.create called with {data=}"
                )
                return await service.create(data)

        @router.get("/{obj_id}", responses={
            404: {"description": "Not Found"}
        })
        async def read(
            obj_id: int,
            service: Annotated[cls.service, Depends()]
        ):
            logger.info(
                f"{cls.service.__name__}.read called with {obj_id=}"
            )
            return await service.read(obj_id)

        if cls.schema_update:
            @router.patch("/{obj_id}", responses={
                400: {"model": HTTPSchemaError,
                      "description": "Schema Error (business logic)"},
                404: {"description": "Not Found"}
            })
            async def update(
                obj_id: int,
                data: cls.schema_update,
                service: Annotated[cls.service, Depends()]
            ) -> cls.schema_read:
                logger.info(
                    f"{cls.service.__name__}.update called with "
                    f"{obj_id=} {data=}"
                )
                return await service.update(obj_id, data)

        @router.delete("/{obj_id}", responses={
            404: {"description": "Not Found"}
        })
        async def delete(
            obj_id: int,
            service: Annotated[cls.service, Depends()]
        ) -> cls.schema_read:
            logger.info(f"{cls.service.__name__}.create called with {obj_id=}")
            return await service.delete(obj_id)

        @router.get('')
        async def _list(
            service: Annotated[cls.service, Depends()],
            query: Annotated[cls.schema_query, Depends()],
            response: Response
        ) -> list[cls.schema_read]:
            logger.info(f"{cls.service.__name__}.list called with {query=}")
            page_count = await service.count(query)
            response.headers["X-Page-Count"] = str(page_count)
            return await service.list(query)
