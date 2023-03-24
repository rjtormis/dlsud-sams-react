from app import db
from flask import jsonify
from datetime import datetime

# Models
from ..models.professor import Professor
from ..models.collegiate import Collegiate
from ..models.details import Details


class ProfessorProfile(db.Model, Details):
    __tablename__ = "professor_profile"
    id = db.Column(db.String(length=40), db.ForeignKey("users.id"), primary_key=True)
    bio = db.Column(db.String(length=500), default="No biography indicated")
    collegiate = db.Column(db.Integer(), db.ForeignKey("collegiates.id"))
    consultation = db.Column(
        db.String(length=50), default="Consultation hours not indicated"
    )
    fb_social = db.Column(db.String(length=50), default="None")
    instagram_social = db.Column(db.String(length=50), default="None")
    linkedIn_social = db.Column(db.String(length=50), default="None")
    twitter_social = db.Column(db.String(length=50), default="None")

    @property
    def serialized(self):
        return {
            "user": {
                "id": self.id,
                "name": f"{self.professor_profile.first_name} {self.professor_profile.middle_initial}. {self.professor_profile.last_name}",
                "type": self.professor_profile.type.upper(),
                "collegiate": self.professor_profile_collegiate.collegiate_name,
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

    def update_professor_profile(
        self,
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
        collegiate_ = Collegiate.query.filter_by(collegiate_name=collegiate).first()

        name_split_reverse = name.split(" ")[::-1]

        f_name = name_split_reverse[2:][::-1]

        self.professor_profile.first_name = " ".join(f_name)
        self.professor_profile.middle_initial = name_split_reverse[1]
        self.professor_profile.last_name = name_split_reverse[0]

        if profile_image != "":
            self.professor_profile.profile_image_link = profile_image

        self.bio = bio
        self.collegiate = collegiate_.id
        self.consultation = consultation
        self.fb_social = fb
        self.instagram_social = instagram
        self.linkedIn_social = linkedIn
        self.twitter_social = twitter
        self.updated = datetime.utcnow()

        db.session.commit()

    def __repr__(self):
        return f"Profile: {self.id}"
