from app import db
from flask import jsonify

# Models
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

    def json_format(self):
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

    def __repr__(self):
        return f"Profile: {self.id}"
