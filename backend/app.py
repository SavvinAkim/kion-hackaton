from flask import jsonify
from config import app_config
from init import create_app, db
from base_functions import add_to_db, model_to_dict
from  models import Document
# from flask import jsonify
# from config import app_config
# from init import create_app, db
# from base_functions import add_to_db, model_to_dict, upload_file, create_bucket
# from  models import Film, Comment
# from config import boto_config

app = create_app(app_config)

# s3 = boto3.client('s3',
#                   endpoint_url='https://s3.filebase.com',
#                   aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
#                   aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
#                   config=boto_config)

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

# @app.route('/films', methods=('GET', 'POST'))
# def main_page():
#     films = Film.query.all()
#     data = []
#     for doc in documents:
#         data.append(model_to_dict(doc))
#     return jsonify(data)

# @app.route('/films/<int:film_id>', methods=('GET', 'POST'))
# def film_page(film_id):
#     Comment = Comment.query.get_or_404(film_id)
#     data = []
#     for doc in documents:
#         data.append(model_to_dict(doc))
#     return jsonify(data)

if __name__ == '__main__':
    app.run()
