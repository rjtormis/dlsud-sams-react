from app import db

# Models
from .details import Details

# Utils
from ..utils.generate_unique_code import id_generator


class Subject(db.Model, Details):
    __tablename__ = "subjects"

    id = db.Column(db.Integer(), primary_key=True)
    section_id = db.Column(
        db.Integer(),
        db.ForeignKey("sections.id", ondelete="CASCADE"),
        nullable=False,
    )
    professor_id = db.Column(
        db.String(length=40),
        db.ForeignKey("professors.id"),
        nullable=False,
    )
    subject_name = db.Column(db.String(length=100), nullable=False)
    start = db.Column(db.String(length=30), nullable=False)
    end = db.Column(db.String(length=30), nullable=False)
    day = db.Column(db.String(length=10), nullable=False)
    code = db.Column(
        db.String(length=30), nullable=False, unique=True, default=id_generator
    )

    @property
    def serialized(self):
        return {
            "id": self.id,
            "code": self.code,
            "subject_name": self.subject_name,
            "section": self.section.section_full,
            "handled_by": f"{self.professor_subject.first_name} {self.professor_subject.middle_initial}. {self.professor_subject.last_name}",
            "schedule": {"start": self.start, "end": self.end, "day": self.day},
        }

    def __repr__(self):
        return f"Subject:{self.subject_name} Section:{self.section.section_full}"
