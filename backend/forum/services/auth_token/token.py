from flask import Blueprint, request, jsonify
import json
from datetime import datetime, timedelta, timezone
from flask_jwt_extended import (
    create_access_token,
    get_jwt,
    get_jwt_identity,
    unset_jwt_cookies,
    jwt_required,
)

from forum.root.stument import StudentMentorForum

name = "token"

bp = Blueprint(name, __name__)
forum = StudentMentorForum()

@bp.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    pub = request.json.get("pub", None)
    
    if email == "" or pub == "":
        return {"status": "error", "error": "Credentials are requred"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

# loging in
@bp.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # getting mentor from the database
    mentor = forum.find_mentor_by_email(email=email)
    if not mentor:
        return {"status": "error", "error": "Invalid credentials"}, 401
    if mentor["password"] != password:
        return {"status": "error", "error": "Invalid credentials"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response
    

@bp.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response