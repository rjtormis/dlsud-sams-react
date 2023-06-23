from app import app, db


class SubjectAttendanceRecord(db.Model):
    __tablename__ = "subjects_attendance_records"
    id = db.Column(db.Integer(), unique=True, nullable=False, primary_key=True)
    subject_code = db.Column(
        db.String(length=10),
        db.ForeignKey("subjects.code", ondelete="CASCADE"),
        nullable=False,
    )
    section_code = db.Column(
        db.Integer(), db.ForeignKey("sections.id", ondelete="CASCADE"), nullable=False
    )
    total_attendance = db.Column(db.Integer(), nullable=False, default=0)
    total_absent = db.Column(db.Integer(), nullable=False, default=0)
    date = db.Column(db.String(length=20), nullable=False)
    time = db.Column(db.String(length=20), nullable=False)
