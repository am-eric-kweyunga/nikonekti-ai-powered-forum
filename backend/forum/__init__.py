##########################################
# External Modules
##########################################

import os
from flask import Flask
from flask_cors import CORS

# blueprints
from forum.blueprints import root_view

def create_app():
    ##########################################
    # Environment Variables
    ##########################################

    secrete_key = os.environ.get("SECRET_KEY")

    ##########################################
    # Flask App Instance
    ##########################################

    app = Flask(__name__, instance_relative_config=True)

    ##########################################
    # Configurations
    ##########################################

    app.secret_key = secrete_key

    ##########################################
    # CORS
    ##########################################

    CORS(
        app,
        resources={
            r"/*": {"origins": "*"}
        },
        allow_headers=["Authorization", "Content-Type"],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        max_age=86400,
    )

    ##########################################
    # Blueprint Registration
    ##########################################
    
    app.register_blueprint(root_view.bp, url_prefix="/")

    return app
