from app import app, db, get_jwt_identity, jwt_required
from flask import request, jsonify
from datetime import datetime

# Models
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
        (
            name,
            bio,
            collegiate,
            consultation,
            fb_social,
            instagram_social,
            linkedIn_social,
            twitter_social,
        ) = (
            data["name"],
            data["bio"],
            data["collegiate"],
            data["consultation"],
            data["socials"]["fb"],
            data["socials"]["instagram"],
            data["socials"]["linkedIn"],
            data["socials"]["twitter"],
        )
        print(fb_social)

        user = Professor.query.filter_by(id=id).first()
        name_split_reverse = name.split(" ")[::-1]
        f_name = name_split_reverse[2:][::-1]
        current_profile = ProfessorProfile.query.filter_by(id=user.id).first()
        current_profile.professor_profile.first_name = " ".join(f_name)
        current_profile.professor_profile.middle_initial = name_split_reverse[1]
        current_profile.professor_profile.last_name = name_split_reverse[0]
        current_profile.bio = bio
        current_profile.consultation = consultation
        current_profile.fb_social = fb_social
        current_profile.instagram_social = instagram_social
        current_profile.linkedIn_social = linkedIn_social
        current_profile.twitter_social = twitter_social
        current_profile.updated = datetime.utcnow()
        current_profile.professor_profile.updated = datetime.utcnow()
        # db.session.commit()
        return jsonify({"msg": "Account edited successfully!"}), 200
