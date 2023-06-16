from flask import jsonify
from app import app, db, jwt_required, get_jwt_identity, cross_origin

# Models
from ..models.student import Student
from ..models.section import Section


@app.route("/api/v1/dashboard", methods=["GET"])
@cross_origin()
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
