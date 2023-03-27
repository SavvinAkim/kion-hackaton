from init import db

class Document(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    timestamp = db.Column(db.String(255), unique=False)
    text = db.Column(db.Text, unique=False)
    link = db.Column(db.String(255), unique=False)
