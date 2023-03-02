from app import app, db
from datetime import datetime


# Helpers
from .details import Details


class Collegiate(db.Model, Details):
    __tablename__ = "collegiates"

    id = db.Column(db.Integer(), primary_key=True)
    collegiate_shorten = db.Column(db.String(length=10), nullable=False, unique=True)
    collegiate_name = db.Column(db.String(length=100), unique=True, nullable=False)

    professor = db.relationship("Professor", backref="professor_collegiate")
