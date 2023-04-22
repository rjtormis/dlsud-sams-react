from app import db
from datetime import datetime, time

# Models
from .user import User
from .student import Student
from .section import Section
from .details import Details

# Utils
from ..utils.database_utilities import push_to_database
from ..utils.generate_unique_code import id_generator

# Exeception
from ..exception import ConflictError


class Subject(db.Model, Details):
    __tablename__ = "subjects"

    id = db.Column(db.Integer(), primary_key=True)
    section_id = db.Column(
        db.Integer(),
        db.ForeignKey("sections.id", ondelete="CASCADE"),
        nullable=False,
    )
    professor_id = db.Column(
        db.String(length=40),
        db.ForeignKey("professors.id"),
        nullable=False,
    )
    subject_name = db.Column(db.String(length=100), nullable=False)
    start = db.Column(db.Time(), nullable=False)
    end = db.Column(db.Time(), nullable=False)
    day = db.Column(db.String(length=30), nullable=False)
    code = db.Column(
        db.String(length=30), nullable=False, unique=True, default=id_generator
    )

    enrolledStudents = db.Relationship("StudentSubject", backref="studentsSubjects")

    @classmethod
    def create_subject(cls, current_user, sectionName, subjectName, start, end, day):
        """Creates a Subject"""

        section = Section.query.filter_by(section_full=sectionName).first()
        user = User.query.filter_by(id=current_user).first()
        subject = cls.query.filter_by(
            section_id=section.id, subject_name=subjectName
        ).first()

        if subject:
            raise ConflictError(
                f"Subject ${subjectName} already exists in {sectionName}"
            )

        else:
            new_subject = cls(
                section_id=section.id,
                professor_id=user.id,
                subject_name=subjectName,
                start=start,
                end=end,
                day=day,
            )
            conflicting_subjects = cls.query.filter_by(
                section_id=section.id, day=day
            ).all()
            for subject in conflicting_subjects:
                if cls.overlapping_time(
                    subject.start, subject.end, new_subject.start, new_subject.end
                ):
                    raise ConflictError("Time Conflict")

            push_to_database(new_subject)

    @classmethod
    def update_subject(cls, section, subject, subjectName, start, end, day):
        query_subject = cls.query.filter_by(
            section_id=section.id, subject_name=subjectName
        ).first()

        conflicting_subjects = cls.query.filter_by(section_id=section.id, day=day).all()
        for sub in conflicting_subjects:
            if sub.id != subject.id:
                if cls.overlapping_time(sub.start, sub.end, start, end):
                    raise ConflictError("Time Conflict")

        if query_subject:
            # If the user only wants to edit minor details on the subject itself.
            if query_subject.id == subject.id:
                subject.subject_name = subjectName
                subject.start = start
                subject.end = end
                subject.day = day
                subject.updated = datetime.now()
                db.session.commit()

            else:
                # Otherwise this will throw a conflict error if subject already exists.
                raise ConflictError(f"{query_subject.subject_name} already exists")
        else:
            subject.subject_name = subjectName
            subject.start = start
            subject.end = end
            subject.day = day
            subject.updated = datetime.now()
            db.session.commit()

    def overlapping_time(start1, end1, start2, end2):
        """
        Checks if the input time does not conflict with other subject.
        """

        start2 = datetime.strptime(start2, "%H:%M").time()
        end2 = datetime.strptime(end2, "%H:%M").time()
        return not (end1 <= start2 or end2 <= start1)

    @property
    def serialized(self):
        enrolled = []

        for student in self.enrolledStudents:
            qUser = Student.query.filter_by(student_no=student.studentNo).first()
            enrolled.append(
                {
                    "name": f"{qUser.first_name} {qUser.middle_initial}. {qUser.last_name}",
                    "profile": qUser.profile_image_link,
                    "studentNo": student.studentNo,
                    "emailAddress": qUser.emailAddress,
                    "total_attendance": student.total_attendance,
                }
            )
        return {
            "id": self.id,
            "code": self.code,
            "subject_name": self.subject_name,
            "section": self.section.section_full,
            "handled_by": f"{self.professor_subject.first_name} {self.professor_subject.middle_initial}. {self.professor_subject.last_name}",
            "handler_id": self.professor_subject.id,
            "schedule": {
                "start": self.start.strftime("%I:%M %p"),
                "end": self.end.strftime("%I:%M %p"),
                "day": self.day,
            },
            "enrolled": enrolled,
        }

    def __repr__(self):
        return f"Subject:{self.subject_name} Section:{self.section.section_full}"
