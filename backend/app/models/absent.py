from app import app, db

from .attendance import Attendance


class Absent(db.Model):
    __tablename__ = "absent"
    id = db.Column(db.Integer(), unique=True, nullable=False, primary_key=True)
    studentNo = db.Column(
        db.String(length=10),
        db.ForeignKey("students.student_no", ondelete="CASCADE"),
        nullable=False,
    )
    sub_code = db.Column(
        db.String(length=50),
        db.ForeignKey("subjects.code", ondelete="CASCADE"),
        nullable=False,
    )
    date = db.Column(db.String(length=20), nullable=False)
