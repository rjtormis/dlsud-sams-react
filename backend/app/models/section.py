from app import app, db
from .details import Details


class Section(db.Model, Details):
    __tablename__ = "sections"

    id = db.Column(db.Integer(), primary_key=True)
    section_adviser = db.Column(db.String(length=40), db.ForeignKey("professors.id"))
    section_full = db.Column(db.String(length=30), unique=True, nullable=False)
    section_course = db.Column(db.String(length=10), nullable=False)
    section_year = db.Column(db.String(length=1), nullable=False)
    section_level = db.Column(db.String(length=1), nullable=False)
    section_image = db.Column(db.String(length=100))

    subjects = db.relationship("Subject", backref="section")

    def json_format(self):
        return {
            "id": self.id,
            "section_full": self.section_full,
            "section_adviser": f"{self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}",
            "section_course": self.section_course,
            "section_year": self.section_year,
            "section_level": self.section_full,
            "section_image": self.section_image,
            "created": self.created,
            "updated": self.updated,
        }

    def __repr__(self) -> str:
        return f"Section {self.section_full} Adviser: {self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}"
