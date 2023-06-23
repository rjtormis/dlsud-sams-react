import requests
import os
from app import app, db, sched
from datetime import datetime, timedelta, date
from flask import jsonify, request

PROD_LINK = os.getenv("PROD_LINK")

# Models
from ..models.user import User
from ..models.subject import Subject
from ..models.studentSubject import StudentSubject
from ..models.attendance import Attendance
from ..models.absent import Absent


# gmt8_tz = timezone("Asia/Singapore")
# current_date = datetime.now(gmt8_tz).date()


def make_api_call():
    """Function that make a specific api call to an endpoint"""

    response = requests.get(f"{PROD_LINK}/automatic_absent")


@sched.task("interval", id="make_api_call", days=1, start_date="2023-06-24 00:00:00")
def schedule_job():
    """
    Scheduler that will automatically make api calls to take attendance
    """

    make_api_call()


@app.route("/automatic_absent", methods=["GET", "POST"])
def automatic_absent():
    """
    RESTFUL API that handles automatic attendance

    Returns : STATUS 200 : SUCCESS
    """

    if request.method == "GET":
        current_date = date.today()
        current_date_string = current_date.strftime("%Y-%m-%d")

        professor_id = []
        all_professor = User.query.filter_by(type="professor").all()

        for prof in all_professor:
            query_sub = Subject.query.filter_by(professor_id=prof.id).all()
            all_sub = []
            for sub in query_sub:
                for students in sub.enrolledStudents:
                    all_sub.append((sub.code, students.studentNo))
            professor_id.append({"id": prof.id, "sub_code": all_sub})

        for ids in professor_id:
            for subject in ids["sub_code"]:
                enrolled = StudentSubject.query.filter_by(
                    studentNo=subject[1], sub_code=subject[0]
                ).first()

                if current_date_string != enrolled.date:
                    previous_date = current_date - timedelta(days=1)
                    previous_date_string = previous_date.strftime("%Y-%m-%d")
                    previous_attendance = Attendance.query.filter_by(
                        studentNo=subject[1],
                        sub_code=subject[0],
                        date=previous_date_string,
                    ).first()
                    if not previous_attendance:
                        absent_query = Absent.query.filter_by(
                            studentNo=subject[1],
                            sub_code=subject[0],
                            date=previous_date_string,
                        ).first()
                        if not absent_query:
                            absent_record = Absent(
                                studentNo=subject[1],
                                date=previous_date_string,
                                sub_code=subject[0],
                            )
                            db.session.add(absent_record)
                            db.session.commit()
                        total_absent = Absent.query.filter_by(
                            studentNo=subject[1], sub_code=subject[0]
                        ).count()
                        enrolled.total_absent = total_absent
        db.session.commit()

    return jsonify({"msg": "Attendance adjusted"})
