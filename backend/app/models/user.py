from app import db, bcrypt
from datetime import datetime
from .helper import generate_uuid


class User(db.Model):

    id = db.Column(primary_key=True, unique=True, default=generate_uuid)
    first_name = db.Column(db.String(length=20), nullable=False)
    middle_initial = db.Column(db.String(length=1), nullable=False)
    last_name = db.Column(db.String(length=20), nullable=False)
    emailAddress = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=50), nullable=False)
    type = db.Column(db.String(length=15), nullable=False)
    created = db.Column(db.DateTime(), default=datetime.utcnow)
    updated = db.Column(db.DateTime(), default=datetime.utcnow)

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, input_password):
        self.password_hash = bcrypt.generate_password_hash(input_password).decode(
            "utf-8"
        )

    def __repr__(self):
        return f"User: {self.first_name} {self.middle_initial} {self.last_name}, Type:{self.type}"
