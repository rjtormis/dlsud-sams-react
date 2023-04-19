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
    student = db.relationship("Student", backref="student_collegiate")
    professor_profile = db.relationship(
        "ProfessorProfile", backref="professor_profile_collegiate"
    )
    student_profile = db.relationship(
        "StudentProfile", backref="student_profile_collegiate"
    )

    @property
    def serialized(self):
        return {
            "id": self.id,
            "shorten": self.collegiate_shorten,
            "name": self.collegiate_name,
        }

    def __repr__(self):
        return f"Collegiate: {self.collegiate_name}"
