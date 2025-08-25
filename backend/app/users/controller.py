from app.core import Controller
from .schemas import UserInitCreate, UserRead, UserInitUpdate
from .service import UserService


class UserController(Controller):
    schema_create = UserInitCreate
    schema_read = UserRead
    schema_update = UserInitUpdate
    service = UserService
