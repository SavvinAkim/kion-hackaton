from flask import jsonify
import pyttsx3
from init import db
from models import Document
import pandas as pd
from text_to_speech import text_to_speech


def throw_exception(message, status):
    exception = {
        'message': message,
        'status': status
    }

    return jsonify(exception), status


def upload_file(file_name, bucket, s3_client, object_name):
    response = s3_client.upload_file(file_name, bucket, object_name)
    return


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


def add_to_s3(data, bucket_name, s3_client):
    links = []
    for i, text in enumerate(data):
        text_to_speech(text[1])
        s3_filename = 'Бриллиантовая рука' + str(i)
        upload_file('buffer.wav', bucket_name, s3_client, f'Бриллиантовая рука/{s3_filename}.wav')
        links.append(f'https://{bucket_name}.s3.filebase.com/Бриллиантовая рука/{s3_filename}.wav')
        i += 1
    return links


def model_to_dict(model, link):
    element = {
        'timestamp': model.timestamp,
        'text': model.text,
        'link': link
    }
    return element


if __name__ == '__main__':
    add_to_db()
