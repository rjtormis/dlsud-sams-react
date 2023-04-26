from app import db
from flask import jsonify
from datetime import datetime

# Models
from ..models.user import User
from ..models.collegiate import Collegiate
from ..models.details import Details


class Profile:
    bio = db.Column(db.String(length=500), default="No biography indicated")
    collegiate = db.Column(db.Integer(), db.ForeignKey("collegiates.id"))
    fb_social = db.Column(db.String(length=50), default="www.facebook.com")

    instagram_social = db.Column(db.String(length=50), default="www.instagram.com")
    linkedIn_social = db.Column(db.String(length=50), default="www.linkedin.com")
    twitter_social = db.Column(db.String(length=50), default="www.twitter.com")


class ProfessorProfile(db.Model, Profile, Details):
    __tablename__ = "professor_profile"
    id = db.Column(db.String(length=40), db.ForeignKey("users.id"), primary_key=True)
    consultation = db.Column(
        db.String(length=50), default="Consultation hours not indicated"
    )

    @property
    def serialized(self):
        return {
            "user": {
                "id": self.id,
                "name": f"{self.professor_profile.first_name} {self.professor_profile.middle_initial}. {self.professor_profile.last_name}",
                "type": self.professor_profile.type.upper(),
                "collegiate": self.professor_profile_collegiate.collegiate_name,
                "profile_image": self.professor_profile.profile_image_link,
                "bio": self.bio,
                "consultation": self.consultation,
                "socials": {
                    "fb": self.fb_social,
                    "instagram": self.instagram_social,
                    "linkedIn": self.linkedIn_social,
                    "twitter": self.twitter_social,
                },
            }
        }

    @classmethod
    def update_professor_profile(
        cls,
        id,
        name,
        bio,
        collegiate,
        consultation,
        fb,
        instagram,
        linkedIn,
        twitter,
        profile_image,
    ):
        """
        Updates the user & profile model.
        """
        current_user = cls.query.filter_by(id=id).first()
        collegiate_ = Collegiate.query.filter_by(collegiate_name=collegiate).first()

        name_split_reverse = name.split(" ")[::-1]

        f_name = name_split_reverse[2:][::-1]

        current_user.professor_profile.first_name = " ".join(f_name)
        current_user.professor_profile.middle_initial = name_split_reverse[1]
        current_user.professor_profile.last_name = name_split_reverse[0]

        if profile_image != "":
            current_user.professor_profile.profile_image_link = profile_image

        current_user.bio = bio
        current_user.collegiate = collegiate_.id
        current_user.consultation = consultation
        current_user.fb_social = fb
        current_user.instagram_social = instagram
        current_user.linkedIn_social = linkedIn
        current_user.twitter_social = twitter
        current_user.updated = datetime.utcnow()

        db.session.commit()

    def __repr__(self):
        return f"Profile: {self.id}"


class StudentProfile(db.Model, Profile, Details):
    __tablename__ = "student_profile"
    id = db.Column(db.String(length=40), db.ForeignKey("users.id"), primary_key=True)

    @property
    def serialized(self):
        return {
            "user": {
                "id": self.id,
                "name": f"{self.student_profile.first_name} {self.student_profile.middle_initial}. {self.student_profile.last_name}",
                "type": self.student_profile.type.upper(),
                "profile_image": self.student_profile.profile_image_link,
                "collegiate": self.student_profile_collegiate.collegiate_name,
                "bio": self.bio,
                "socials": {
                    "fb": self.fb_social,
                    "instagram": self.instagram_social,
                    "twitter": self.twitter_social,
                },
            }
        }

    @classmethod
    def update_student_profile(
        cls, id, name, bio, collegiate, fb, instagram, twitter, profile_image
    ):
        current_user = cls.query.filter_by(id=id).first()
        collegiate_ = Collegiate.query.filter_by(collegiate_name=collegiate).first()

        name_split_reverse = name.split(" ")[::-1]

        f_name = name_split_reverse[2:][::-1]

        current_user.student_profile.first_name = " ".join(f_name)
        current_user.student_profile.middle_initial = name_split_reverse[1]
        current_user.student_profile.last_name = name_split_reverse[0]

        if profile_image != "":
            current_user.student_profile.profile_image_link = profile_image

        current_user.bio = bio
        current_user.collegiate = collegiate_.id
        current_user.fb_social = fb
        current_user.instagram_social = instagram
        current_user.twitter_social = twitter
        current_user.updated = datetime.utcnow()

        db.session.commit()
