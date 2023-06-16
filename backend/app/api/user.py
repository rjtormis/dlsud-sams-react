from app import app, jwt_required, cross_origin
from flask import request, jsonify

# Models
from ..models.user import User
from ..models.student import Student
from ..models.professor import Professor
from ..models.collegiate import Collegiate
from ..models.profile import ProfessorProfile

# Helper
from ..utils.database_utilities import push_to_database
from ..utils.generate_unique_code import unique_identifier_file

# Exception
from ..exception import ConflictError

# Error Handler
from ..errors import handle_conflict_error


@app.route("/api/v1/users", methods=["GET", "POST"])
@cross_origin()
def users():
    """
    REST API that handles the GET USER and CREATE USER(POST)

    Return: STATUS 201(CREATED/SUCCESSFULL) , STATUS 409(CONFLICT/EXISTING ACCOUNT)
    """

    if request.method == "POST":
        data = request.get_json()

        if data["type"] == "student":
            id = data["studentNumber"]
            try:
                Student.create_student_account(
                    id,
                    data["firstName"],
                    data["middleInitial"],
                    data["lastName"],
                    data["type"],
                    data["emailAddress"],
                    data["confirmPassword"],
                    data["collegiate"],
                )
                return jsonify({"message": "Student account created"}), 201
            except ConflictError as e:
                return handle_conflict_error(e)

        if data["type"] == "professor":
            try:
                Professor.create_professor_account(
                    data["firstName"],
                    data["middleInitial"],
                    data["lastName"],
                    data["type"],
                    data["collegiate"],
                    data["emailAddress"],
                    data["confirmPassword"],
                )

                return jsonify({"message": "Professor account created"}), 201
            except ConflictError as e:
                return handle_conflict_error(e)


@app.route("/api/v1/user/get-pre-signed-url-profile", methods=["POST"])
@cross_origin()
@jwt_required()
def generate_presigned_profile():
    """
    REST API that gets pre signed url for AWS s3 storage then saves the image location e.g
    https://aws-sams-storage.s3.ap-southeast-1.amazonaws.com/user/default_profile.jpg    to the aws s3.

    Return:
            POST : STATUS 200 (Success)
    """

    if request.method == "POST":
        data = request.get_json()
        response, Key = User.generate_pre_signed_url(
            data["id"], data["type"], data["fileName"]
        )

        return jsonify(
            {
                "signed_url": response,
                "location": f"{Key}",
            }
        )
