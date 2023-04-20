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


@app.route("/api/v1/students/<string:id>", methods=["GET", "POST"])
@jwt_required()
def student_subject(id):
    current_user = get_jwt_identity()

    if request.method == "GET":
        qUser = Student.query.filter_by(id=current_user).first()
        qSubjects = StudentSubject.query.filter_by(studentNo=qUser.student_no).all()
        subjects = []

        for i in qSubjects:
            qSub = Subject.query.filter_by(code=i.sub_code).first()
            subjects.append(qSub.serialized)

        return jsonify(subjects), 200
