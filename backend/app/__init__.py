from flask import Flask
from app.config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# Esential API Imports
from .api import section, user, auth, dashboard

# Essential Model Imports
from .models.user import User
from .models.student import Student
from .models.collegiate import Collegiate
from .models.section import Section


# Scripts
from .scripts.addCollegiate import collegiateScript

# Disable this when developing
# with app.app_context():

#     db.create_all()
#     collegiateScript()
