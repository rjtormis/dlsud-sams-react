from app import app, db, jwt_required, get_jwt_identity
from flask import jsonify, request

# Model
from ..models.student import Student
from ..models.subject import Subject
from ..models.studentSubject import StudentSubject

# Exception

from ..exception import ConflictError

# Error
from ..errors import handle_conflict_error


@app.route("/api/v1/students/enroll", methods=["POST"])
@jwt_required()
def enroll():
    current_user = get_jwt_identity()
    data = request.get_json()
    code = data["code"]

    try:
        StudentSubject.enroll_student(current_user, code)
        return jsonify({"message": "Enrolled successfully"})
    except ConflictError as e:
        return handle_conflict_error(e)
