from contextlib import asynccontextmanager

from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from . import media, eaip_issues

from app.users.routes import router as users_router
from app.auth.routes import router as auth_router

from .core import (
    service_exception_handler, SchemaException, Base, setup_docs,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    lifespan=lifespan,
    title="AIS API",
    description=("<code>/api/v1</code> - основная версия API."),
    responses={
        413: {
            "description": "Payload Too Large (nginx)"
        },
        429: {
            "description": "Too Many Requests (nginx)"
        },
        500: {
            "description": "Internal Server Error (unexpected error)"
        }
    },
    openapi_tags=[
        {
            "name": "Auth",
            "description": (
                "Аутентификация реализована через UUID-токен, хранящийся в "
                "cookie."
            )
        }
    ]
)

ALLOWED_ORIGINS = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://192.168.0.105:3000",
    "http://127.0.0.1:3000",
    "http://ais.ansp.kg",
    "https://ais.ansp.kg",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

v1 = APIRouter(prefix="/api/v1")
v1.include_router(users_router)
v1.include_router(auth_router)
v1.include_router(media.router)
v1.include_router(eaip_issues.router)
app.include_router(v1)

app.exception_handler(SchemaException)(service_exception_handler)

setup_docs(app)

