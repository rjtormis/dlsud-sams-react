import os
from dotenv import load_dotenv

load_dotenv()


class ApplicationConfig:

    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("db")
