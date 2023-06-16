from app import app, db, get_jwt_identity, jwt_required, cross_origin
from flask import request, jsonify
from datetime import datetime

# Models
from ..models.collegiate import Collegiate
from ..models.professor import Professor
from ..models.student import Student
from ..models.profile import ProfessorProfile, StudentProfile


@app.route("/api/v1/profiles/<string:id>/professor", methods=["GET", "PATCH"])
@jwt_required()
def professor_profile(id):
    """
    REST API that handles the GET Profile and PATCH Profile (update profile)

    Parameters: ID - id of the user

    Return:
            GET : STATUS 200(Success) - Returns the profile / user details
            PATCH : Status 200(Success) - Returns success if the profile has / have been successfully edited
    """

    current_user = get_jwt_identity()
    if request.method == "GET":
        user = Professor.query.filter_by(id=id).first()
        current_profile = ProfessorProfile.query.filter_by(id=user.id).first()
        return current_profile.serialized, 200

    if request.method == "PATCH":
        data = request.get_json()
        print(data)
        ProfessorProfile.update_professor_profile(
            current_user,
            data["name"],
            data["bio"],
            data["collegiate"],
            data["consultation"],
            data["socials"]["fb"],
            data["socials"]["instagram"],
            data["socials"]["linkedIn"],
            data["socials"]["twitter"],
            data["profile_image"],
        )

        return jsonify({"msg": "Account edited successfully!"}), 200


@app.route("/api/v1/profiles/<string:id>/student", methods=["GET", "POST", "PATCH"])
@jwt_required()
def student_profile(id):
    current_user = get_jwt_identity()

    if request.method == "GET":
        user = Student.query.filter_by(id=id).first()
        current_profile = StudentProfile.query.filter_by(id=user.id).first()

        return current_profile.serialized, 200

    if request.method == "PATCH":
        data = request.get_json()
        print(data)
        StudentProfile.update_student_profile(
            current_user,
            data["name"],
            data["bio"],
            data["collegiate"],
            data["socials"]["fb"],
            data["socials"]["instagram"],
            data["socials"]["twitter"],
            data["profile_image"],
        )
        return jsonify({"msg": "Account edited successfully!"}), 200
