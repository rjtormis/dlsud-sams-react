from app import app, db
from .details import Details


class Section(db.Model, Details):
    __tablename__ = "sections"

    id = db.Column(db.Integer(), primary_key=True)
    section_adviser = db.Column(db.String(length=40), db.ForeignKey("professors.id"))
    section_name = db.Column(db.String(length=30), unique=True, nullable=False)
    section_image = db.Column(db.String(length=100))

    def json_format(self):
        return {
            "id": self.id,
            "section_name": self.section_name,
            "section_adviser": f"{self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}",
            "section_image": self.section_image,
            "created": self.created,
            "updated": self.updated,
        }

    def __repr__(self) -> str:
        return f"Section {self.section_name} Adviser: {self.section_adviser}"
