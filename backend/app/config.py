import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_KEY")
AWS_KEY = os.getenv("SECRET_KEY")


class ApplicationConfig:
    SECRET_KEY = os.getenv("SECRET_KEY")
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = os.getenv("db")
    SQLALCHEMY_POOL_SIZE = 10
    SQLALCHEMY_POOL_TIMEOUT = 30

    JWT_TOKEN_LOCATION = ["headers"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=5)
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(hours=10)
    JWT_SECRET_KEY = os.getenv("SECRET_KEY")
    # JWT_ACCESS_COOKIE_NAME = "access_token_cookie"
    # JWT_ACCESS_COOKIE_PATH = "/"
    # JWT_COOKIE_CSRF_PROTECT = True
    JWT_COOKIE_SECURE = True
    # JWT_REFRESH_COOKIE_NAME = "refresh_token_cookie"
    # JWT_REFRESH_COOKIE_PATH = "/"
