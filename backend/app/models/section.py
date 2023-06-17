from app import app, db, s3, s3_resource, s3_bucket_name
from flask import jsonify
from .details import Details
from datetime import datetime

# Utilities
from ..utils.database_utilities import push_to_database, delete_in_database
from ..utils.generate_unique_code import unique_identifier_file

# Exception
from ..exception import ConflictError


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

        query_section = cls.query.filter_by(section_full=full).first()

        if query_section:
            raise ConflictError("Section already taken")
        else:
            new_section = cls(
                section_full=full,
                section_course=course,
                section_adviser=id,
                section_year=year,
                section_level=section,
            )
            push_to_database(new_section)

            new_section.check_section_folder(f"section/{new_section.id}")

            return new_section.serialized

    @classmethod
    def isAdviser(cls, user, sectionName):
        """
        Checks if the user  is the section adviser
        """
        query_section = cls.query.filter_by(section_full=sectionName).first()
        return query_section.section_adviser == user

    @classmethod
    def update_section(cls, name, course, year, section_level):
        """
        Updates the section.
        """
        section = cls.query.filter_by(section_full=name).first()

        full = f"{course} {year}{section_level}"

        qSection = cls.query.filter_by(section_full=full).first()

        if qSection:
            if qSection.section_full == name:
                pass

            else:
                raise ConflictError("Section already exists")

        section.section_course = course
        section.section_year = year
        section.section_level = section
        section.section_full = full
        section.updated = datetime.utcnow()

        db.session.commit()
        return section.serialized

    @classmethod
    def delete_section(cls, section):
        """
        Deletes the section

        """
        bucket = s3_resource.Bucket(s3_bucket_name)
        bucket.objects.filter(Prefix=f"section/{section.id}").delete()
        delete_in_database(section)

    @classmethod
    def generate_presigned_url(cls, id, filename):
        imgID = unique_identifier_file()
        section = Section.query.filter_by(id=id).first()
        if section.section_image_link != "default_section_image.jpg":
            current_section_image = section.section_image_link.split("/")[1]
            s3.delete_object(
                Bucket=s3_bucket_name,
                Key=f"section/{section.id}/{current_section_image}",
            )
        Key = f"{id}/{imgID}_{filename}"
        response = s3.generate_presigned_post(
            s3_bucket_name, Key=f"section/{Key}", ExpiresIn=300
        )
        return response, Key

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
                        "start": subject.start.strftime("%I:%M %p"),
                        "end": subject.end.strftime("%I:%M %p"),
                        "day": subject.day,
                    },
                }
                for subject in self.subjects
            ],
        }

    @classmethod
    def check_section_folder(cls, folder_path):
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

    def __repr__(self) -> str:
        return f"Section {self.section_full} Adviser: {self.professor.first_name} {self.professor.middle_initial} {self.professor.last_name}"
