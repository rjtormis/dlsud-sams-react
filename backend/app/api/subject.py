from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify, make_response

# Models
from ..models.user import User
from ..models.section import Section
from ..models.subject import Subject


@app.route("/api/v1/subjects", methods=["GET", "POST"])
@jwt_required()
def subjects():

    if request.method == "POST":
        current_user = get_jwt_identity()
        print(current_user)
        data = request.get_json()
        print(data)
        return jsonify({"msg": "test"}), 200
