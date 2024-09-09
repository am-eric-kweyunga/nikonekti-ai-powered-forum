##########################################
# External Modules
##########################################

from os import environ
from flask import Flask
from flask_cors import CORS

# services
from forum.services import root_view
from forum.services.students import students_view
from forum.services.mentors import mentors_view
from forum.services.connection import connection_view
from forum.services.room import room_view
from forum.services.socketio.events import socketio


def create_app():

    ##########################################
    # Flask App Instance
    ##########################################

    app = Flask(__name__)
    
    ##########################################
    # Configurations
    ##########################################

    # Set the secret key for the Flask app
    app.secret_key = environ.get("SECRET_KEY")
    
    ##########################################
    # CORS
    ##########################################

    CORS(
        app,
        resources={r"/*": {"origins": "*"}},
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        max_age=86400,
    )
    
    ##########################################
    # SocketIO Initialization
    ##########################################

    socketio.init_app(app)
    
    ##########################################
    # Services Registration
    ##########################################

    app.register_blueprint(root_view.bp, url_prefix="/")
    app.register_blueprint(students_view.bp, url_prefix="/api")
    app.register_blueprint(mentors_view.bp, url_prefix="/api")
    app.register_blueprint(connection_view.bp, url_prefix="/api")
    app.register_blueprint(room_view.bp, url_prefix="/api")

    return app
