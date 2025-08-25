from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, Response

from .services.auth_session_service import AuthSessionService
from .dependecies import AuthUserDep, TokenDep
from .schemas import AuthSessionInitCreate


router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/login")
async def login(
    data: AuthSessionInitCreate,
    response: Response,
    service: Annotated[AuthSessionService, Depends()],
):
    auth = await service.create(data)
    response.set_cookie(
        "token",
        auth.token,
        max_age=99999999999999999999999,
        httponly=True
    )


@router.get('')
async def get_auth(
    service: Annotated[AuthSessionService, Depends()]
):
    return await service.get_auth()


@router.post("/logout")
async def logout(
    service: Annotated[AuthSessionService, Depends()],
    response: Response
):
    await service.logout_session()
    response.delete_cookie(key="token")



@router.post("/logout-all")
async def logout_all(
    service: Annotated[AuthSessionService, Depends()],
    response: Response
):
    await service.logout_user()
    response.delete_cookie(key="token")
