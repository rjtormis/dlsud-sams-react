from app import db

# Models
from .user import User
from .collegiate import Collegiate
from .profile import ProfessorProfile

# Utilities
from ..utils.database_utilities import push_to_database

# Exception
from ..exception import ConflictError


class Professor(User):
    __tablename__ = "professors"

    id = db.Column(db.String(length=40), db.ForeignKey("users.id"), primary_key=True)
    collegiate_id = db.Column(
        db.Integer(), db.ForeignKey("collegiates.id"), nullable=False
    )

    sections = db.relationship("Section", backref="professor")
    subjects = db.relationship("Subject", backref="professor_subject")
    profile = db.relationship("ProfessorProfile", backref="professor_profile")
    __mapper_args__ = {"polymorphic_identity": "professor"}

    @classmethod
    def create_professor_account(
        cls, first, middle, last, type, collegiate, email, password
    ):
        """
        Creates a professor account
        """

        qEmail = User.query.filter_by(emailAddress=email).first()
        collegiate = Collegiate.query.filter_by(collegiate_shorten=collegiate).first()
        if qEmail:
            raise ConflictError("Email already taken.")

        new_professor = cls(
            first_name=first,
            middle_initial=middle,
            last_name=last,
            type=type,
            collegiate_id=collegiate.id,
            emailAddress=email,
            password=password,
        )
        push_to_database(new_professor)

        new_professor_profile = ProfessorProfile(
            id=new_professor.id, collegiate=new_professor.collegiate_id
        )

        push_to_database(new_professor_profile)
        new_professor.check_user_folder(f"user/professor/{new_professor.id}")

    def __repr__(self):
        return f"Professor: {self.emailAddress}"
