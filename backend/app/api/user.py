from app import app, db
from flask import request, jsonify

# Models
from ..models.user import User
from ..models.student import Student
from ..models.professor import Professor
from ..models.collegiate import Collegiate

# Helper
from ..utils.database_utilities import push_to_database


@app.route("/api/v1/users", methods=["GET", "POST"])
def users():
    """
    REST API that handles the GET USER and CREATE USER(POST)

    Return: STATUS 201(CREATED/SUCCESSFULL) , STATUS 409(CONFLICT/EXISTING ACCOUNT)
    """

    if request.method == "GET":
        return jsonify({"OK": "KEYO!"})

    if request.method == "POST":

        data = request.get_json()
        (
            first_name,
            middle_initial,
            last_name,
            type,
            emailAddress,
            password,
            confirmPassword,
        ) = (
            data["firstName"],
            data["middleInitial"],
            data["lastName"],
            data["type"],
            data["emailAddress"],
            data["password"],
            data["confirmPassword"],
        )

        if type == "student":

            id = data["studentNumber"]

            query_email = User.query.filter_by(emailAddress=emailAddress).first()
            query_id = Student.query.filter_by(student_no=id).first()

            if query_email and query_id:
                return jsonify({"msg": "Student number & Email already taken."}), 409

            if query_id:
                return jsonify({"msg": "Student no. already taken."}), 409

            if query_email:
                return jsonify({"msg": "Email already taken."}), 409

            new_student = Student(
                first_name=first_name,
                middle_initial=middle_initial,
                last_name=last_name,
                student_no=id,
                type=type,
                emailAddress=emailAddress,
                password=confirmPassword,
            )
            push_to_database(new_student)

        if type == "professor":
            query_email = User.query.filter_by(emailAddress=emailAddress).first()

            if query_email:
                return jsonify({"msg": "Email already taken."}), 409

            collegiate_shorten = data["collegiate"]

            collegiate = Collegiate.query.filter_by(
                collegiate_shorten=collegiate_shorten
            ).first()

            new_professor = Professor(
                first_name=first_name,
                middle_initial=middle_initial,
                last_name=last_name,
                type=type,
                collegiate_id=collegiate.id,
                emailAddress=emailAddress,
                password=confirmPassword,
            )

            push_to_database(new_professor)

        return jsonify({"msg": "Successful"}), 201
