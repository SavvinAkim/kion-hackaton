from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import boto3
from config import boto_config
import os

db = SQLAlchemy()
migrate = Migrate()
PER_PAGE = 20
s3 = boto3.client('s3',
                  endpoint_url='https://s3.filebase.com',
                  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                  config=boto_config)


def create_app(config):
    app = Flask(__name__)
    app.config.from_object(config)
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    return app
