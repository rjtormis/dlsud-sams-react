from app import app, db, jwt, bcrypt, cross_origin
from datetime import datetime, date, timedelta

from flask import jsonify, request, make_response
from flask_jwt_extended import create_access_token
from flask_jwt_extended import create_refresh_token
from flask_jwt_extended import set_access_cookies
from flask_jwt_extended import set_refresh_cookies
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

# Models
from ..models.user import User
from ..models.subject import Subject
from ..models.student import Student
from ..models.studentSubject import StudentSubject
from ..models.attendance import Attendance
from ..models.absent import Absent

# Exception
from ..exception import NotFoundError

# Error Handler
from ..errors import handle_not_found_error


@app.route("/login", methods=["POST"])
def auth():
    """
    REST API that handles the authentication

    Return: POST: 200(success) , 404(Conflict)
    """

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    try:
        serialized_user = User.authenticate(email, password)
        access_token = create_access_token(identity=serialized_user["id"], fresh=True)
        refresh_token = create_refresh_token(identity=serialized_user["id"])
        return jsonify(
            {
                "user": serialized_user,
                "access_token": access_token,
                "refresh_token": refresh_token,
            }
        )
    except NotFoundError as e:
        return handle_not_found_error(e)


@app.route("/refresh_token", methods=["POST"])
@cross_origin()
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
