from app import app, db, jwt_required, get_jwt_identity, cross_origin
from flask import jsonify

# Models
from ..models.student import Student
from ..models.studentSubject import StudentSubject


@app.route("/api/v1/studentdashboard", methods=["GET"])
@cross_origin()
@jwt_required()
def student_dashboard():
    """
    REST API THAT HANDLES THE STUDENT DASHBOARD INFORMATION

    Return: GET STATUS 200
    """

    current_user = get_jwt_identity()
    qUser = Student.query.filter_by(id=current_user).first()
    total_students = db.session.query(Student.id).count()
    total_subject = len(
        StudentSubject.query.filter_by(studentNo=qUser.student_no).all()
    )
    return jsonify(
        {
            "total_students": total_students,
            "total_subjects": total_subject,
            "total_lectures_attended": qUser.total_lectures_attended,
        }
    )
