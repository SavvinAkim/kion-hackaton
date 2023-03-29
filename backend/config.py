from os import path, getenv
from botocore.config import Config


boto_config = Config(
    region_name = 'us-east-1',
    signature_version = 's3v4',
)


class AppConfig(object):
    basedir = path.abspath(path.dirname(__file__))
    ELASTICSEARCH_URL = getenv('ELASTICSEARCH_URL')
    SECRET_KEY = getenv("SECRET_KEY")
    SQLALCHEMY_DATABASE_URI = getenv("DATABASE_URL", "postgresql://")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True


app_config = AppConfig()

