from app import app, db, get_jwt_identity, jwt_required
from flask import request, jsonify
from datetime import datetime

# Models
from ..models.collegiate import Collegiate
from ..models.professor import Professor
from ..models.profile import ProfessorProfile


@app.route("/api/v1/profiles/<string:id>", methods=["GET", "PATCH"])
@jwt_required()
def professor_profile(id):

    current_user = get_jwt_identity()
    if request.method == "GET":
        user = Professor.query.filter_by(id=id).first()
        current_profile = ProfessorProfile.query.filter_by(id=user.id).first()
        return current_profile.json_format(), 200

    if request.method == "PATCH":
        data = request.get_json()
        print(data)

        user = Professor.query.filter_by(id=id).first()
        collegiate_ = Collegiate.query.filter_by(
            collegiate_name=data["collegiate"]
        ).first()
        current_profile = ProfessorProfile.query.filter_by(id=user.id).first()
        current_profile.update_professor_profile(
            data["name"],
            data["bio"],
            collegiate_.id,
            data["consultation"],
            data["socials"]["fb"],
            data["socials"]["instagram"],
            data["socials"]["linkedIn"],
            data["socials"]["twitter"],
            data["profile_image"],
        )
        return jsonify({"msg": "Account edited successfully!"}), 200
