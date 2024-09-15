##########################################
# External Modules
##########################################

from datetime import timedelta
import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail

# services
from forum.services import root_view
from forum.services.students import students_view
from forum.services.mentors import mentors_view
from forum.services.connection import connection_view
from forum.services.room import room_view
from forum.services.socketio.events import socketio
from forum.services.mailer import mailer_view
from forum.services.auth_token import token

MAIL_SERVER = os.getenv("MAIL_SERVER")
MAIL_PORT = 587
MAIL_USE_TLS = True
MAIL_USERNAME = os.getenv("SENDGRID_USERNAME")
MAIL_PASSWORD = os.getenv("SENDGRID_PASSWORD")
MAIL_DEFAULT_SENDER = os.getenv("MAIL_DEFAULT_SENDER")
MAIL_SUPPRESS_SEND = False

def create_app():


    ##########################################
    # Flask App Instance
    ##########################################

    app = Flask(__name__)
    # Assuming you have initialized Flask-Mail in your app
    mail = Mail(app)

    # adding mail to the app
    app.config["MAIL"] = mail
    jwt = JWTManager(app)

    ##########################################
    # Configurations
    ##########################################

    # Set the secret key for the Flask app
    app.secret_key = os.getenv("SECRET_KEY")
    app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024

    app.config["MAIL_SERVER"] = MAIL_SERVER
    app.config["MAIL_PORT"] = MAIL_PORT
    app.config["MAIL_USE_TLS"] = MAIL_USE_TLS
    app.config["MAIL_USERNAME"] = MAIL_USERNAME
    app.config["MAIL_PASSWORD"] = MAIL_PASSWORD
    app.config["MAIL_DEFAULT_SENDER"] = MAIL_DEFAULT_SENDER
    app.config["MAIL_SUPPRESS_SEND"] = MAIL_SUPPRESS_SEND
  
    # JWT Configurations
    app.config["JWT_SECRET_KEY"] = "please-remember-to-change-me"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
    app.config["JWT"] = jwt
    
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
    app.register_blueprint(mailer_view.bp, url_prefix="/mailer")
    app.register_blueprint(token.bp, url_prefix="/api")

    return app
