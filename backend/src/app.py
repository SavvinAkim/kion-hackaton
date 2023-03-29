from flask import jsonify, request
from config import app_config
from init import create_app, db
from base_functions import *
from models import Film, Comment, Document
from config import boto_config
import boto3
import os

app = create_app(app_config)

s3 = boto3.client('s3',
				  endpoint_url='https://s3.filebase.com',
				  aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
				  aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
				  config=boto_config)


@app.route('/api/', methods=('GET', 'POST'))
def pull_data():
	txt = add_to_db()
	documents = Document.query.all()
	links = add_to_s3(txt,'sdfsnmbhfndxvfxkf' , s3)
	data = []
	for i, elem in enumerate(documents):
		data.append(model_to_dict(documents[i], links[i]))
	return jsonify(data)


@app.route('/api/', methods=('GET', 'DELETE'))
def delete_data():
	db.session.query(Document).delete()
	db.session.commit()
	return


@app.route('/api/films/', methods=('GET', 'POST'))
def get_all_films():
	if request.method == 'GET':
		films = Film.query.all()
		response_data = []

		for film in films:
			response_data.append({
				'id': film.id,
				'name': film.name,
				'url': film.url
			})

		return jsonify(response_data)
	else:
		data = request.get_json()
		new_film = Film(data)
		db.session.add(new_film)
		db.session.commit()

		return jsonify({
			'id': new_film.id,
			'name': new_film.name,
			'url': new_film.url
		}), 201


@app.route('/api/comments/', methods=('GET', 'POST'))
def get_film_comments():
	if request.method == 'GET':
		try:
			film_id = int(request.args.get('film'))
			if film_id == '' or film_id is None:
				return throw_exception('Укажите айди фильма в параметрах запроса', 400)

			film = Film.query.get_or_404(film_id)
			film_comments = film.comments.all()
			response_data = []

			for comment in film_comments:
				response_data.append({
					'id': comment.id,
					'text': comment.text,
					'timestamp': comment.timestamp,
					'link': comment.link,
				})

			return jsonify(response_data)
		except Exception:
			return throw_exception('Такого фильма не существует', 404)
	else:
		data = request.get_json()
		new_comment = Comment(data)
		db.session.add(new_comment)
		db.session.commit()

		return jsonify({
			'id': new_comment.id,
			'timestamp': new_comment.timestamp,
			'text': new_comment.text,
			'link': new_comment.link
		}), 201


@app.route('/api/films/<int:film_id>', methods=('GET', 'DELETE'))
def films(film_id):
	if request.method == 'GET':
		try:
			film = Film.query.get_or_404(film_id)
			film_comments = film.comments.all()
			film_comments_data = []

			for comment in film_comments:
				film_comments_data.append({
					'id': comment.id,
					'text': comment.text,
					'timestamp': comment.timestamp,
					'link': comment.link,
				})

			return jsonify({
				'id': film.id,
				'name': film.name,
				'url': film.url,
				'comments': film_comments_data
			})
		except Exception:
			return throw_exception('Такого фильма не существует', 404)
	else:
		film = Film.query.filter_by(id=film_id).one()
		db.session.delete(film)
		db.session.commit()

		return jsonify({
			'id': film.id,
			'url': film.url,
			'name': film.name
		}), 200


if __name__ == '__main__':
	app.run()
