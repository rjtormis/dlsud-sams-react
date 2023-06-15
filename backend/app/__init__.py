import boto3
import json
import cv2
import numpy as np
import os

from flask import Flask
from app.config import ApplicationConfig, AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_KEY
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


app = Flask(__name__)
app.config.from_object(ApplicationConfig)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app=app)
s3 = boto3.client(
    "s3",
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY,
    region_name="ap-southeast-1",
)

s3_resource = boto3.resource(
    "s3", aws_access_key_id=AWS_ACCESS_KEY, aws_secret_access_key=AWS_SECRET_KEY
)
s3_bucket_name = "aws-sams-storage"


# Esential API Imports
from .api import (
    section,
    user,
    auth,
    dashboard,
    subject,
    profile,
    collegiate,
    studentdashboard,
    attendance,
)

# Essential Model Imports
from .models.user import User
from .models.student import Student
from .models.professor import Professor, Lecture
from .models.collegiate import Collegiate
from .models.section import Section
from .models.subject import Subject
from .models.profile import ProfessorProfile, StudentProfile
from .models.studentSubject import StudentSubject
from .models.attendance import Attendance


# Scripts
from .scripts.addCollegiate import collegiateScript

# Disable this when developing
# with app.app_context():
#     db.create_all()
#     collegiateScript()
