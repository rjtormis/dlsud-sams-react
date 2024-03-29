from flask import jsonify
from app import app, db, jwt_required, get_jwt_identity, cross_origin
from datetime import datetime, timedelta

# Models
from ..models.student import Student
from ..models.section import Section
from ..models.professor import Lecture
from ..models.subject import Subject


@app.route("/api/v1/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    """
    REST API that handles the main page of the dashboard where it queries the total
    for students, sections, and lectures done by the professor.

    Return: GET: STATUS 200(Authorized/Success) , STATUS 401("UNAUTHORIZED/Missing JWT Token")
    """

    current_user = get_jwt_identity()
    total_student = db.session.query(Student.id).count()
    total_section = db.session.query(Section.id).count()
    total_lectures = Lecture.query.filter_by(professor_id=current_user).count()

    if not current_user:
        return jsonify({"msg": "UNAUTHORIZED"}), 401
    return jsonify(
        {
            "total": {
                "students": total_student,
                "lectures": total_lectures,
                "classrooms": total_section,
            },
        }
    )


@app.route("/api/v1/graph", methods=["GET"])
@jwt_required()
def graph():
    today = datetime.now().date()
    current_user = get_jwt_identity()
    subjects = Subject.query.filter_by(professor_id=current_user).all()
    data = []
    for sub in subjects:
        data.append(sub.graph)

    return jsonify({"graph": data})
