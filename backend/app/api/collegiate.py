from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify

# Models
from ..models.collegiate import Collegiate


@app.route("/api/v1/collegiates", methods=["GET", "POST", "PATCH"])
@jwt_required()
def collegiates():
    current_user = get_jwt_identity()
    if request.method == "GET":
        collegiates = Collegiate.query.all()
        return jsonify(
            {"collegiates": [collegiate.json_format() for collegiate in collegiates]}
        )
