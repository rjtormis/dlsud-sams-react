from flask import jsonify, request
from app import app, db, jwt_required, get_jwt_identity
from ..models.student import Student


@app.route("/api/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    total_student = Student.query.count()

    return jsonify(
        {"total": {"students": total_student, "lectures": 1, "classrooms": 999}}
    )
