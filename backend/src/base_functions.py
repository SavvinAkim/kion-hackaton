from flask import jsonify
from init import db
from models import Document
import pandas as pd


def throw_exception(message, status):
    exception = {
        'message': message,
        'status': status
    }

    return jsonify(exception), status


def time_to_seconds(time):
    listtime = time.split(':')[::-1]
    seconds = 0
    for i, element in enumerate(listtime):
        seconds += int(element) * 60 ** i
    return str(seconds)


def add_to_db():
    url = 'https://docs.google.com/spreadsheets/d/1iw85uGjFezyV3a1gAl7XRLqMWYSbO3yuEf8_ZC6Ry5k/gviz/tq?tqx=out:csv'
    pd.set_option('display.max_rows', None)
    dataframe = pd.read_csv(url)
    dct = dataframe.to_dict('split')
    res = []
    for element in dct['data']:
        res.append(element[1])
        timestamp = time_to_seconds(element[0])
        if not Document.query.filter_by(timestamp=timestamp).first():
            db.session.add(Document(
                timestamp=timestamp,
                text=element[1]))
            db.session.commit()
    return res


def model_to_dict(model):
    element = {
        'timestamp': model.timestamp,
        'text': model.text,
        'link': model.link
    }
    return element


if __name__ == '__main__':
    add_to_db()
