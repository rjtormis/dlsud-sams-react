from flask import jsonify, request
from app import app, db, jwt_required
from ..models.student import Student


@app.route("/api/dashboard", methods=["GET"])
def dashboard():

    total_student = Student.query.count()

    return jsonify(
        {"total": {"students": total_student, "lectures": 1, "classrooms": 999}}
    )
