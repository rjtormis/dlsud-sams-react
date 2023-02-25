from app import app, db
from flask import request, jsonify

# Models
from ..models.user import User

# Helper
from .helper import account_type


@app.route("/api/v1/users", methods=["GET", "POST"])
def users():

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

        new_user = User(
            first_name=first_name,
            middle_initial=middle_initial,
            last_name=last_name,
            type=account_type(type),
            emailAddress=emailAddress,
            password=confirmPassword,
        )

        print(new_user)

        # db.session.add(new_user)
        # db.session.commit()

        return jsonify({"msg": "Successful"}), 201
