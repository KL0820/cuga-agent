from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Use SQLite for simplicity, but can be easily changed to PostgreSQL
DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{os.path.abspath('crm.db')}")

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    from crm_api.models import Base

    # Reset database file on each startup
    db_path = os.path.abspath("crm.db")
    if os.path.exists(db_path):
        os.remove(db_path)

    Base.metadata.create_all(bind=engine)

    # Check if we need to seed data
    from crm_api.crud import account_crud

    db = SessionLocal()
    try:
        if account_crud.count(db) == 0:
            from crm_api.seed_data import seed_database

            seed_database(db)
    finally:
        db.close()
