import boto3
from app import db, bcrypt, s3, s3_resource
from datetime import datetime

# Helper
from ..utils.generate_uuid import generate_uuid
from .details import Details


class User(db.Model, Details):

    __tablename__ = "users"
    id = db.Column(
        db.String(length=40), primary_key=True, unique=True, default=generate_uuid
    )
    first_name = db.Column(db.String(length=20), nullable=False)
    middle_initial = db.Column(db.String(length=1), nullable=False)
    last_name = db.Column(db.String(length=20), nullable=False)
    emailAddress = db.Column(db.String(length=345), nullable=False, unique=True)
    profile_image_link = db.Column(
        db.String(length=345),
        default="https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com/user/default_profile.jpg",
    )
    password_hash = db.Column(db.String(length=300), nullable=False)
    type = db.Column(db.String(length=15), nullable=False)

    __mapper_args__ = {"polymorphic_identity": "user", "polymorphic_on": type}

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, input_password):
        self.password_hash = bcrypt.generate_password_hash(input_password).decode(
            "utf-8"
        )

    def check_user_folder(self, bucket_name, folder_path):

        """
        Check if the folder of the user already exists in AWS s3

        """

        bucket = s3_resource.Bucket(bucket_name)

        objs = list(bucket.objects.filter(Prefix=folder_path))
        if len(objs) > 0 and objs[0].key == folder_path + "/":
            return True

        try:
            s3.put_object(Bucket=bucket_name, Key=(folder_path + "/"))
        except Exception as e:
            print("Error occured")
            return False

    def __repr__(self):
        return f"User: {self.first_name} {self.middle_initial} {self.last_name}, Type:{self.type}"
