from flask import jsonify, request
from app import app, db, jwt_required, get_jwt_identity

# Models
from ..models.student import Student
from ..models.section import Section


@app.route("/api/v1/dashboard", methods=["GET"])
@jwt_required()
def dashboard():
    current_user = get_jwt_identity()
    total_student = db.session.query(Student.id).count()
    total_section = db.session.query(Section.id).count()

    if not current_user:
        return jsonify({"msg": "UNAUTHORIZED"}), 401
    return jsonify(
        {
            "total": {
                "students": total_student,
                "lectures": 1,
                "classrooms": total_section,
            }
        }
    )
