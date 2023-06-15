from app import db


class Attendance(db.Model):
    __tablename__ = "attendance"
    id = db.Column(db.Integer(), unique=True, nullable=False, primary_key=True)
    studentNo = db.Column(
        db.String(length=10), db.ForeignKey("students.student_no"), nullable=False
    )
    sub_code = db.Column(
        db.String(length=50), db.ForeignKey("subjects.code"), nullable=False
    )
    date = db.Column(db.String(length=20), nullable=False)
    time = db.Column(db.String(length=20), nullable=False)
