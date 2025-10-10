import os
from functools import lru_cache

from pydantic_settings import BaseSettings


class AbstractConfig(BaseSettings):
    DATABASE_URL: str


class BaseConfig(AbstractConfig):
    DATABASE_URL: str = (
        "postgresql+asyncpg://postgres:FMsDsXfPoDQr1@localhost:5432/database"
    )
