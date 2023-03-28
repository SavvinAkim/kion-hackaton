from init import db


class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.String(255), unique=False)
    text = db.Column(db.Text, unique=False)
    link = db.Column(db.String(255), unique=False)

# class Comment(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
#     timestamp = db.Column(db.String(255), unique=False)
#     text = db.Column(db.Text, unique=False)
#     link = db.Column(db.String(255), unique=False)
#     film_id = db.Column(db.Integer, db.ForeignKey('films.film_id'))
#
#
# class Film(db.Model):
#     __tablename__ = 'films'
#     id = db.Column('film_id', db.Integer, primary_key=True, autoincrement=True)
#     name = db.Column(db.String(255), unique=True)
#     comments = db.relationship("Comment", cascade="all, delete-orphan", backref="Film", lazy='dynamic')
