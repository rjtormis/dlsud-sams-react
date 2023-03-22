from app import app, db, s3, s3_bucket_name, s3_resource, jwt_required
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
            new_professor_profile = ProfessorProfile(
                id=new_professor.id, collegiate=new_professor.collegiate_id
            )
            push_to_database(new_professor_profile)
            new_professor.check_user_folder(f"user/professor/{new_professor.id}")

        return jsonify({"msg": "Successful"}), 201


@app.route("/api/v1/user/get-pre-signed-url-profile", methods=["POST"])
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
        imgID = unique_identifier_file()
        user = User.query.filter_by(id=data["id"]).first()

        if user.profile_image_link != "default_profile.jpg":
            current_profile = user.profile_image_link.split("/")[2]
            s3.delete_object(
                Bucket=s3_bucket_name,
                Key=f"user/{user.type}/{user.id}/{current_profile}",
            )

        Key = f"{data['type']}/{data['id']}/{imgID}_{data['fileName']}"
        response = s3.generate_presigned_post(
            s3_bucket_name, Key=f"user/{Key}", ExpiresIn=300
        )

        return jsonify(
            {
                "signed_url": response,
                "location": f"{Key}",
            }
        )
