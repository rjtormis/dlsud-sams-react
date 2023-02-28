from flask import jsonify, request
from flask_jwt_extended import create_access_token
from app import app, db, jwt, bcrypt

# Models
from ..models.user import User


@app.route("/login", methods=["POST"])
def auth():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    query_email = User.query.filter_by(emailAddress=email).first()

    if query_email:
        confirm_password = bcrypt.check_password_hash(
            query_email.password_hash, password
        )
        if confirm_password:
            access_token = create_access_token(identity=query_email.id)
            return jsonify(
                {
                    "id": query_email.id,
                    "type": query_email.type,
                    "access_token": access_token,
                }
            )

        else:
            return jsonify({"msg": "Invalid credentials"}), 404

    else:
        return jsonify({"msg": "Invalid credentials"}), 404
