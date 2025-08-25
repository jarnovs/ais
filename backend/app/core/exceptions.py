from typing import Annotated
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BeforeValidator, BaseModel
from starlette.status import HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND


class SchemaError(BaseModel):
    loc: Annotated[list[str], BeforeValidator(lambda v: v.split('.'))]
    msg: str
    type: str = "value_error"


class SchemaException(HTTPException):
    status_code = HTTP_400_BAD_REQUEST

    def __init__(self, detail: list[SchemaError]) -> None:
        self.detail = detail


class HTTPSchemaError(BaseModel):
    detail: list[SchemaError]


class NotFoundException(HTTPException):
    status_code = HTTP_404_NOT_FOUND

    def __init__(self, detail: str = "Not Found"):
       self.detail = detail


async def service_exception_handler(request: Request, exc: SchemaException):
    return JSONResponse(
        status_code=exc.status_code,
        content=HTTPSchemaError(detail=exc.detail).model_dump()
    )
