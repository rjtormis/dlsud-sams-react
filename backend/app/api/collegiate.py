from app import app, db, jwt_required, get_jwt_identity
from flask import request, jsonify

# Models
from ..models.collegiate import Collegiate


@app.route("/api/v1/collegiates", methods=["GET"])
@jwt_required()
def collegiates():
    """
    Rest API that gets all of the collegiates

    Return:
            GET: STATUS 200(Success)
    """

    current_user = get_jwt_identity()
    if request.method == "GET":
        collegiates = Collegiate.query.all()
        return jsonify(
            {"collegiates": [collegiate.json_format() for collegiate in collegiates]}
        )
