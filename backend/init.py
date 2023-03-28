from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
# import boto3

db = SQLAlchemy()
migrate = Migrate()
PER_PAGE = 20


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    return app
