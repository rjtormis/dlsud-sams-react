from app import db

# Model
from .user import User
from .collegiate import Collegiate
from .profile import StudentProfile
from .collegiate import Collegiate

# Utilities
from ..utils.database_utilities import push_to_database

# Exception
from ..exception import ConflictError


class Student(User):
    __tablename__ = "students"
    id = db.Column(db.String(length=40), db.ForeignKey("users.id"))

    student_no = db.Column(db.String(length=10), primary_key=True, nullable=False)
    collegiate_id = db.Column(db.Integer(), db.ForeignKey("collegiates.id"))
    total_lectures_attended = db.Column(db.Integer(), nullable=False, default=0)
    subjects = db.relationship("StudentSubject", backref="students_subjects")
    profile = db.relationship("StudentProfile", backref="student_profile")
    __mapper_args__ = {"polymorphic_identity": "student"}

    @classmethod
    def create_student_account(
        cls, id, first, middle, last, type, email, password, collegiate
    ):
        """
        Creates a student account.
        """
        qEmail = User.query.filter_by(emailAddress=email).first()
        qId = cls.query.filter_by(student_no=id).first()
        qCollegiate = Collegiate.query.filter_by(collegiate_shorten=collegiate).first()

        if qEmail and qId:
            raise ConflictError("Student number & Email already taken.")
        if qEmail:
            raise ConflictError("Email already taken.")
        if qId:
            raise ConflictError("Student no. already taken.")

        new_student = cls(
            first_name=first,
            middle_initial=middle,
            last_name=last,
            collegiate_id=qCollegiate.id,
            student_no=id,
            type=type,
            emailAddress=email,
            password=password,
        )

        push_to_database(new_student)

        new_student_profile = StudentProfile(
            id=new_student.id, collegiate=new_student.collegiate_id
        )
        push_to_database(new_student_profile)
        new_student.check_user_folder(f"user/student/{new_student.id}")

    def __repr__(self):
        return f"Student: {Student.emailAddress} ID:{self.student_no}"
