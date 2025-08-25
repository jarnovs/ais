from fastapi import APIRouter

from .controller import UserController


router = APIRouter(prefix="/users", tags=["Users"])

UserController.register(router)
