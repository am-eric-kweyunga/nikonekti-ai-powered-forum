from flask import Blueprint, jsonify

bp_name = "root"
bp = Blueprint(bp_name, __name__)

@bp.route("/")
def root_view():
    return jsonify({ "Indexed": "Your hitting Nikonekti Forum root view"})