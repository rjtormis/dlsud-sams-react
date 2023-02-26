from app import db

from .user import User


class Student(User):
    __tablename__ = "students"
    id = db.Column(db.String(length=40), db.ForeignKey("users.id"))

    student_no = db.Column(db.String(length=10), primary_key=True, nullable=False)
    __mapper_args__ = {"polymorphic_identity": "student"}

    def __repr__(self):
        return f"Student: {Student.emailAddress} ID:{self.student_no}"
