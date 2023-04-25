from app import db

# Models
from ..models.student import Student
from ..models.subject import Subject

# Helper
from ..utils.database_utilities import push_to_database

# Exception
from ..exception import ConflictError, NotFoundError


class StudentSubject(db.Model):
    __tablename__ = "studentsubjects"
    id = db.Column(db.Integer(), primary_key=True)
    sub_code = db.Column(
        db.String(length=30), db.ForeignKey("subjects.code"), nullable=False
    )
    studentNo = db.Column(
        db.String(length=40), db.ForeignKey("students.student_no"), nullable=False
    )
    total_attendance = db.Column(db.Integer(), nullable=False, default=0)

    @property
    def serialized(self):
        return {
            "id": self.id,
            "sub_code": self.sub_code,
            "studentNo": self.studentNo,
            "total_attendance": self.total_attendance,
        }

    @classmethod
    def enroll_student(cls, id, code):
        qUser = Student.query.filter_by(id=id).first()
        qSubject = Subject.query.filter_by(code=code).first()
        if qSubject:
            qEnrollSub = StudentSubject.query.filter_by(
                sub_code=qSubject.code, studentNo=qUser.student_no
            ).first()
            if qEnrollSub:
                raise ConflictError("You are already enrolled in this subject.")

            enrollSub = StudentSubject(
                sub_code=qSubject.code, studentNo=qUser.student_no
            )
            push_to_database(enrollSub)
        else:
            raise NotFoundError("Subject code does not exists")
