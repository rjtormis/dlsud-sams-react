from app import db
from .user import User


class Professor(User):
    __tablename__ = "professors"

    id = db.Column(db.String(length=40), db.ForeignKey("users.id"), primary_key=True)
    collegiate_id = db.Column(
        db.Integer(), db.ForeignKey("collegiates.id"), nullable=False
    )
    collegiate = db.relationship("Collegiate", backref="professor_collegiate")

    __mapper_args__ = {"polymorphic_identity": "professor"}