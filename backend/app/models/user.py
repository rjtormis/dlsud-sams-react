import boto3
from app import db, bcrypt, s3, s3_resource, s3_bucket_name
from datetime import datetime

# Helper
from ..utils.generate_uuid import generate_uuid
from .details import Details

# Exception
from ..exception import NotFound


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
        default="default_profile.jpg",
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

    @classmethod
    def authenticate(
        cls,
        email,
        password,
    ):
        """
        Handles the user authentication
        """

        query_email = User.query.filter_by(emailAddress=email).first()
        confirm_password = bcrypt.check_password_hash(
            query_email.password_hash, password
        )

        if query_email:
            if confirm_password:
                return query_email.serialized(), query_email
            else:
                raise NotFound("Invalid credentials")
        else:
            raise NotFound("Invalid credentials")

    @property
    def check_user_folder(self, folder_path):

        """
        Check if the folder of the user already exists in AWS s3

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

    @property
    def serialized(self):
        return {
            "id": self.id,
            "name": f"{self.first_name} {self.middle_initial}. {self.last_name}",
            "type": self.type,
            "profile_image": self.profile_image_link,
        }

    def __repr__(self):
        return f"User: {self.first_name} {self.middle_initial} {self.last_name}, Type:{self.type}"
