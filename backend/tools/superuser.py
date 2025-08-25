from asyncio import run

from sqlalchemy import select

from app.core import get_database, get_config
from app.users.models import User
from app.users.schemas import UserCreate, UserInitCreate
from app.auth.models import AuthSession


async def create_superuser(async_session):
    async with async_session() as session:
        try:
            superuser = User()
            init = UserInitCreate(name="superuser", password="s33y0u")
            new = UserCreate(name=init.name, password_hash=init.password)
            await new.map_to(session, superuser)
            session.add(superuser)
            await session.commit()
            print("Superuser created")
        except:
            print("Something went wrong. Probably superuser already exists.")


async def main():
    database = get_database(get_config().DATABASE_URL)
    await create_superuser(database.async_session)


if __name__ == "__main__":
    run(main())
