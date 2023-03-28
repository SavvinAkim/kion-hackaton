from flask import jsonify
from config import app_config
from init import create_app, db
from base_functions import add_to_db, model_to_dict
from  models import Document

app = create_app(app_config)


@app.route('/', methods=('GET', 'POST'))
def pull_data():
    add_to_db()
    documents = Document.query.all()
    data = []
    for doc in documents:
        data.append(model_to_dict(doc))
    return jsonify(data)


@app.route('/', methods=('GET', 'DELETE'))
def delete_data():
    db.session.query(Document).delete()
    db.session.commit()
    return

if __name__ == '__main__':
    app.run()
