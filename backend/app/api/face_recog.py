import json
import os

from app import app, db, cross_origin
from flask import Response, request, jsonify


# Models
from ..models.student import Student
from ..models.section import Section
from ..models.subject import Subject
from ..models.studentSubject import StudentSubject
from ..models.professor import Professor, Lecture
from ..models.attendance import Attendance
from ..models.subjectAttendanceRecord import SubjectAttendanceRecord


from ..utils.fr import get_face, recognition_thread, main, model, model_emb
from threading import Thread


def get_className(classNo):
    if classNo == 0:
        return "Ranel John Tormis"


@app.route("/api/v1/video_feed", methods=["GET", "POST"])
@cross_origin()
def video_feed():
    """
    RESTFUL API that transmits the live videofeed coming from the backend
    to the frontend

    """

    if request.method == "GET":
        sub_code = request.args.get("sub_code")
        disabled_camera = request.args.get("disable_camera")
        return Response(
            main(
                disable=True if disabled_camera == "true" else False, sub_code=sub_code
            ),
            mimetype="multipart/x-mixed-replace; boundary=frame",
        )


@app.route("/api/v1/detected_faces", methods=["GET", "POST"])
def detected_faces():
    """
    RESTFUL API that handles the detected faces saved on a specific json named file.
    Returns : STATUS 200 : Detected faces & Timestamps

    """

    current_dir = os.getcwd()
    sub_code = request.args.get("sub_code")
    file_path = os.path.join(current_dir, "app", "data", f"{sub_code}.json")

    with open(file_path, "r") as file:
        data = json.load(file)
    return jsonify({"faces": data["faces"], "time": data["time"]})


@app.route("/api/v1/record", methods=["GET", "POST"])
@cross_origin()
def record_attendance():
    """
    RESTFUL API that handles the recording of attendance

    """

    if request.method == "POST":
        data = request.get_json()

        for faces in data["detected"]:
            split_name = faces.split()
            first_name = " ".join(split_name[:-1])
            last_name = split_name[-1]

            student = Student.query.filter_by(
                first_name=first_name, last_name=last_name
            ).first()
            enrolledSubject = StudentSubject.query.filter_by(
                sub_code=data["sub_code"], studentNo=student.student_no
            ).first()

            if not enrolledSubject:
                return jsonify({"error": "Student does not exists"})

            subject = Subject.query.filter_by(code=data["sub_code"]).first()

            attendance = Attendance.query.filter_by(
                studentNo=student.student_no,
                sub_code=data["sub_code"],
                date=data["date"],
            ).first()

            if not attendance:
                subject_attendance_query = SubjectAttendanceRecord.query.filter_by(
                    subject_code=data["sub_code"], date=data["date"]
                ).first()

                if not subject_attendance_query:
                    subject_record = SubjectAttendanceRecord(
                        subject_code=data["sub_code"],
                        section_code=subject.section_id,
                        date=data["date"],
                        time=data["time"],
                    )
                    db.session.add(subject_record)
                    db.session.commit()
                    subject_record.total_attendance = (
                        subject_record.total_attendance + 1
                    )
                    db.session.commit()
                else:
                    subject_attendance_query.total_attendance = (
                        subject_attendance_query.total_attendance + 1
                    )
                    db.session.commit()

                attendance = Attendance(
                    studentNo=student.student_no,
                    sub_code=data["sub_code"],
                    date=data["date"],
                    time=data["time"],
                )
                db.session.add(attendance)

                enrolledSubject.total_attendance = enrolledSubject.total_attendance + 1

        lecture = Lecture.query.filter_by(
            professor_id=data["id"], sub_code=data["sub_code"], date=data["date"]
        ).first()
        if not lecture:
            update_lecture = Lecture(
                professor_id=data["id"],
                sub_code=data["sub_code"],
                date=data["date"],
                time=data["time"],
            )
            db.session.add(update_lecture)
            db.session.commit()
            update_lecture.lectures.total_lectures = (
                update_lecture.lectures.total_lectures + 1
            )
        student.total_lectures_attended = student.total_lectures_attended + 1
        db.session.commit()

        return jsonify({"message": "Attendance recorded!"})
