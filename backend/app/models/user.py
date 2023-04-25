import boto3
from app import db, bcrypt, s3, s3_resource, s3_bucket_name
from datetime import datetime

# Models
from .details import Details

# Helper
from ..utils.generate_uuid import generate_uuid
from ..utils.generate_unique_code import unique_identifier_file

# Exception
from ..exception import NotFoundError


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

        query_email = cls.query.filter_by(emailAddress=email).first()

        if query_email:
            confirm_password = bcrypt.check_password_hash(
                query_email.password_hash, password
            )
            if confirm_password:
                return query_email.serialized
            else:
                raise NotFoundError("Invalid login credentials")
        else:
            raise NotFoundError("Invalid login credentials")

    @classmethod
    def generate_pre_signed_url(cls, id, type, filename):
        """
        Generates pre signed url

        """

        imgID = unique_identifier_file()
        user = User.query.filter_by(id=id).first()
        if user.profile_image_link != "default_profile.jpg":
            current_profile = user.profile_image_link.split("/")[2]
            s3.delete_object(
                Bucket=s3_bucket_name,
                Key=f"user/{user.type}/{user.id}/{current_profile}",
            )
        Key = f"{type}/{id}/{imgID}_{filename}"
        response = s3.generate_presigned_post(
            s3_bucket_name, Key=f"user/{Key}", ExpiresIn=300
        )
        return response, Key

    @classmethod
    def check_user_folder(cls, folder_path):
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
