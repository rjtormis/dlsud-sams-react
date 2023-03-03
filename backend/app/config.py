import os
from dotenv import load_dotenv

load_dotenv()


class ApplicationConfig:

    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("db")

    JWT_TOKEN_LOCATION = ["cookies"]
    JWT_SECRET_KEY = os.getenv("SECRET_KEY")
    JWT_ACCESS_COOKIE_NAME = "access_token_cookie"
    JWT_ACCESS_COOKIE_PATH = "/"
    JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SECURE = True
    JWT_REFRESH_COOKIE_NAME = "refresh_token_cookie"
    JWT_REFRESH_COOKIE_PATH = "/"
