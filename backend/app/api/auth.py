from flask import jsonify, request, make_response

from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import set_refresh_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from app import app, db, jwt, bcrypt

# Models
from ..models.user import User


@app.route("/login", methods=["POST"])
def auth():
    """
    REST API that handles the authentication

    Return: POST: 200(success) , 404(Conflict)
    """

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    query_email = User.query.filter_by(emailAddress=email).first()

    if query_email:
        confirm_password = bcrypt.check_password_hash(
            query_email.password_hash, password
        )
        if confirm_password:
            access_token = create_access_token(identity=query_email.id, fresh=True)
            refresh_token = create_refresh_token(identity=query_email.id)

            response = jsonify(
                {
                    "user": {
                        "id": query_email.id,
                        "name": f"{query_email.first_name} {query_email.middle_initial}. {query_email.last_name}",
                        "type": query_email.type,
                        "profile_image": query_email.profile_image_link,
                    }
                }
            )
            set_access_cookies(response, access_token)
            set_refresh_cookies(response, refresh_token)

            return response, 200

        else:
            return jsonify({"msg": "Invalid credentials"}), 404

    else:
        return jsonify({"msg": "Invalid credentials"}), 404


@app.route("/refresh_token", methods=["POST"])
@jwt_required(refresh=True)
def refresh():
    """
    REST API that issue new JWT token in every 8 minutes to the user.

    Return: POST: STATUS 200
    """

    current_user = get_jwt_identity()
    query_id = User.query.filter_by(id=current_user).first()
    access_token = create_access_token(identity=query_id.id, fresh=False)
    response = make_response("success")
    set_access_cookies(response, access_token)
    return response, 200


@app.route("/logout", methods=["POST"])
def logout():
    """
    REST API that handles the logout.

    Return: POST: STATUS 200
    """

    response = make_response("logout")
    response.set_cookie("access_token_cookie", "", max_age=0)
    response.set_cookie("refresh_token_cookie", "", max_age=0)
    response.set_cookie("csrf_refresh_token", "", max_age=0)
    response.set_cookie("csrf_access_token", "", max_age=0)
    response.set_cookie("id", "", max_age=0)
    return response, 200
