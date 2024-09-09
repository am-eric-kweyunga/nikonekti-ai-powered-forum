# system imports
from flask import Blueprint, jsonify, request


bp_name = "root"
bp = Blueprint(bp_name, __name__)

@bp.route("/", methods=["GET"])
def root_view():
    if request.method == "GET":
        user = "me"
        return jsonify({ "success": "User was created", "user": user }), 201
    
    return jsonify({ "error": "Method not allowed" }), 405