from app.config import ApplicationConfig
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt()


# Esential API Imports
from .api import user

# Essential Model Imports
from .models.user import User
from .models.student import Student
from .models.collegiate import Collegiate


# Scripts
from .scripts.addCollegiate import collegiateScript

# Disable this when developing
# with app.app_context():

#     db.create_all()
#     collegiateScript()
