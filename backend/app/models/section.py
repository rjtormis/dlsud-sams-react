from app import app, db, s3, s3_resource, s3_bucket_name
from flask import jsonify
from .details import Details

# Utilities
from utils.database_utilities import push_to_database

# Exception
from exception import ConflictError


class Section(db.Model, Details):
    __tablename__ = "sections"

    id = db.Column(db.Integer(), primary_key=True)
    section_adviser = db.Column(db.String(length=40), db.ForeignKey("professors.id"))
    section_full = db.Column(db.String(length=30), unique=True, nullable=False)
    section_course = db.Column(db.String(length=10), nullable=False)
    section_year = db.Column(db.String(length=1), nullable=False)
    section_level = db.Column(db.String(length=1), nullable=False)
    section_image_link = db.Column(
        db.String(length=100), default="default_section_image.jpg"
    )

    subjects = db.relationship("Subject", backref="section", cascade="all,delete")

    @classmethod
    def create_section(cls, course, year, section, id):
        full = f"{course} {year}{section}"

        query_section = Section.query.filter_by(section_full=full).first()

        if query_section:
            raise ConflictError("Section already taken")
        else:
            new_section = Section(
                section_full=full,
                section_course=course,
                section_adviser=id,
                section_year=year,
                section_level=section,
            )
            push_to_database(new_section)

            new_section.check_section_folder(f"section/{new_section.id}")

            return new_section.serialized()

    @classmethod
    def isAdviser(self, user):
        """
        Checks if the user  is the section adviser
        """
        query_section = Section.query.filter_by(section_full=user).first()
        return query_section.section_adviser == user

    @property
    def serialized(self):
        return {
            "id": self.id,
            "section_full": self.section_full,
            "section_adviser_id": f"{self.professor.id}",
            "section_adviser": f"{self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}",
            "section_course": self.section_course,
            "section_year": self.section_year,
            "section_section": self.section_level,
            "section_image_link": self.section_image_link,
            "created": self.created,
            "updated": self.updated,
            "subjects": [
                {
                    "id": subject.id,
                    "code": subject.code,
                    "subject_name": subject.subject_name,
                    "section": subject.section.section_full,
                    "handled_by": f"{subject.professor_subject.first_name} {subject.professor_subject.middle_initial}. {subject.professor_subject.last_name}",
                    "handler_id": f"{subject.professor_subject.id}",
                    "schedule": {
                        "start": subject.start,
                        "end": subject.end,
                        "day": subject.day,
                    },
                }
                for subject in self.subjects
            ],
        }

    @property
    def check_section_folder(self, folder_path):
        """
        Check if folder exists in AWS s3.

        Parameters : self
                     file_path - takes the file path on where the object will be saved

        """
        bucket = s3_resource.Bucket(s3_bucket_name)
        objs = list(bucket.objects.filter(Prefix=folder_path))
        if len(objs) > 0 and objs[0].key == folder_path + "/":
            return True

        try:
            s3.put_object(Bucket=s3_bucket_name, Key=(folder_path + "/"))
        except Exception as e:
            print("Error occured")
            return False

    def update_section(self, folder_path):
        """
        Updates the section.
        """
        query_section = Section.query.filter_by(section_full=full).first()

        pass

    def __repr__(self) -> str:
        return f"Section {self.section_full} Adviser: {self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}"
