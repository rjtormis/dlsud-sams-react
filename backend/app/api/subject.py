from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify, make_response
from datetime import datetime

# Models
from ..models.professor import Professor
from ..models.student import Student
from ..models.section import Section
from ..models.subject import Subject
from ..models.studentSubject import StudentSubject

# Utils
from ..utils.generate_unique_code import id_generator
from ..utils.database_utilities import push_to_database, delete_in_database

# Exceptions
from ..exception import ConflictError

# Error handler
from ..errors import handle_conflict_error


@app.route("/api/v1/subjects", methods=["POST", "DELETE"])
@jwt_required()
def subjects():
    """
    REST API that handles the creation of subject on specific section

    Return: POST: STATUS 200
    """
    current_user = get_jwt_identity()

    if request.method == "POST":
        data = request.get_json()
        try:
            Subject.create_subject(
                current_user,
                data["sectionName"],
                data["subjectName"],
                data["start"],
                data["end"],
                data["day"],
            )
            return jsonify({"message": "Subject created successfully"})
        except ConflictError as e:
            return handle_conflict_error(e)


@app.route(
    "/api/v1/subjects/<string:section_name>/<string:sub>",
    methods=["GET", "PATCH", "DELETE"],
)
@jwt_required()
def specific_subject(section_name, sub):
    """
    REST API that handles the deleting and editing of the specific subject

    Return: PATCH : STATUS 200(SUCCESS) STATUS 409(Subject already exists)
            DELETE : STATUS 200
    """

    current_user = get_jwt_identity()
    section = Section.query.filter_by(section_full=section_name).first()
    current_subject = Subject.query.filter_by(
        section_id=section.id, subject_name=sub
    ).first()

    if request.method == "GET":
        rankings = []
        results = (
            StudentSubject.query.filter_by(sub_code=current_subject.code)
            .order_by(StudentSubject.total_attendance.desc())
            .all()
        )

        for rank, student in enumerate(results, start=1):
            qUser = Student.query.filter_by(student_no=student.studentNo).first()
            obj = {
                "rank": rank,
                "user": qUser.serialized,
                "total": student.total_attendance,
            }
            rankings.append(obj)
        return jsonify({"ranking": rankings}), 200
    if request.method == "PATCH":
        data = request.get_json()

        try:
            Subject.update_subject(
                section,
                current_subject,
                data["subjectName"],
                data["start"],
                data["end"],
                data["day"],
            )
            return jsonify({"msg": "Subject successfully edited"})
        except ConflictError as e:
            return handle_conflict_error(e)

    if request.method == "DELETE":
        delete_in_database(current_subject)
        return jsonify({"msg": "Subject deleted successfully."})


@app.route(
    "/api/v1/subjects/<string:code>/<string:id>/enrolled",
    methods=["GET", "POST", "PATCH", "DELETE"],
)
@jwt_required()
def remove_subject(code, id):
    current_user = get_jwt_identity()

    if request.method == "PATCH":
        data = request.get_json()

        qUser = StudentSubject.query.filter_by(
            sub_code=f"{code}", studentNo=f"{id}"
        ).first()

        qUser.total_attendance = data["total"]

        push_to_database(qUser)

        return jsonify({"msg": "OK"}), 200

    if request.method == "DELETE":
        print(code, id)
        qUser = StudentSubject.query.filter_by(
            sub_code=f"{code}", studentNo=f"{id}"
        ).first()
        delete_in_database(qUser)
        return jsonify({"message": "Student removed successfully"}), 200
