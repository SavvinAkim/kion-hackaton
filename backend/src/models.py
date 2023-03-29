from init import db


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.String(255), unique=False)
    text = db.Column(db.Text, unique=False)
    link = db.Column(db.String(255), unique=False)


class Comment(db.Model):
    def __init__(self, dto):
        self.timestamp = dto['timestamp']
        self.text = dto['text']
        self.link = dto['link']
        self.film_id = dto['film_id']

    __tablename__: str = 'comments'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.String(255), unique=False)
    text = db.Column(db.Text, unique=False, nullable=False)
    link = db.Column(db.String(255), unique=False)
    film_id = db.Column(db.Integer, db.ForeignKey('films.id', ondelete='CASCADE'), nullable=False)


class Film(db.Model):
    def __init__(self, dto):
        self.name = dto['name']
        self.url = dto['url']

    __tablename__ = 'films'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), unique=True, nullable=False)
    url = db.Column(db.String(255), unique=True, nullable=False)
    comments = db.relationship("Comment", cascade="all, delete-orphan", backref="Film", lazy='dynamic')
