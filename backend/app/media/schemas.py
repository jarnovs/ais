from pydantic import BaseModel


class FileRead(BaseModel):
    file: str