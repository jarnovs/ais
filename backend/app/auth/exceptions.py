from fastapi import HTTPException
from starlette.status import HTTP_401_UNAUTHORIZED

from app.core import SchemaException, SchemaError


InvalidAuthData = SchemaException(
    [
        SchemaError(loc="body.username", msg="Неправильный логин или пароль"),
        SchemaError(loc="body.password", msg="Неправильный логин или пароль"),
    ]
)

NotAuthenticated = HTTPException(status_code=HTTP_401_UNAUTHORIZED,
                                  detail="Not authenticated")
