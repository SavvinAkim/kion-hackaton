from init import db, s3
import pyttsx3
from init import db
from models import Document
import pandas as pd
from text_to_speech import text_to_speech


def create_bucket(bucket_name, s3_client, region=None):
    if bucket_name not in s3_client.list_buckets():
        s3_client.create_bucket(Bucket=bucket_name)
    return


def upload_file(file_name, bucket, s3_client, object_name):
    response = s3_client.upload_file(file_name, bucket, object_name)
    return


def time_to_seconds(time):
    listtime = time.split(':')[1::-1]
    seconds = 0
    for i, element in enumerate(listtime):
        seconds += int(element) * 60 ** i
    return str(seconds - 3239)


def add_to_db():
    url = 'https://docs.google.com/spreadsheets/d/1UTgvaQWUvHSAPIG919A6v-9FfEOrWLArfT4e2cDA-LQ/gviz/tq?tqx=out:csv'
    pd.set_option('display.max_rows', None)
    dataframe = pd.read_csv(url)
    dct = dataframe.to_dict('split')
    for element in dct['data']:
        if not isinstance(element[0], float) and not isinstance(element[2], float):
            timestamp = time_to_seconds(element[0])
            if not Document.query.filter_by(timestamp=timestamp).first():
                db.session.add(Document(
                    timestamp=timestamp,
                    text=element[1].split('\n')[1]))
        #             link=element[2].split()[1]))
                db.session.commit()
        return element[1].split('\n')[1]


def model_to_dict(model):
    element = {
        'timestamp': model.timestamp,
        'text': model.text,
        'link': model.link
    }
    return element


def add_to_s3(data, bucket_name, s3_client):
    create_bucket(bucket_name, s3_client)
    links = []
    for i, text in enumerate(data):
        text_to_speech(text)
        s3_filename = film + str(i)
        upload_file('buffer.wav', bucket_name, s3_client, s3_filename)
        links.appen(f'.../{s3_filename}')
        i += 1
    return links


if __name__ == '__main__':
    add_to_db()
    add_to_s3()
