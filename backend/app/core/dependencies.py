import logging
from functools import lru_cache
from typing import Annotated, AsyncGenerator

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from .config import AbstractConfig, BaseConfig
from .database import Database


logger = logging.getLogger(__name__)


@lru_cache
def get_config():
    return BaseConfig()


ConfigDep = Annotated[AbstractConfig, Depends(get_config)]


def get_database_url(config: ConfigDep):
    return config.DATABASE_URL


@lru_cache
def get_database(url: Annotated[str, Depends(get_database_url)]):
    logger.debug(f"Connected to database: {url}")
    return Database(url)


DatabaseDep =  Annotated[Database, Depends(get_database)]


async def get_session(
    database: DatabaseDep
) -> AsyncGenerator[AsyncSession, None]:
    async with database.async_session() as session:
        yield session


SessionDep = Annotated[AsyncSession, Depends(get_session)]
