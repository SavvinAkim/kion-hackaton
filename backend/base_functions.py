from init import db
from models import Document
import pandas as pd

def time_to_seconds(time):
    listtime = time.split(':')[1::-1]
    seconds = 0
    for i, element in enumerate(listtime):
        seconds += int(element) * 60 ** i
    return str(seconds - 3187.4)


def add_to_db():
    url = 'https://docs.google.com/spreadsheets/d/1UTgvaQWUvHSAPIG919A6v-9FfEOrWLArfT4e2cDA-LQ/gviz/tq?tqx=out:csv'
    pd.set_option('display.max_rows', None)
    dataframe = pd.read_csv(url)
    dct = dataframe.to_dict('split')
    for element in dct['data']:
        if not isinstance(element[0], float):
            timestamp = time_to_seconds(element[0])
            if not Document.query.filter_by(timestamp=timestamp).first():
                db.session.add(Document(
                    timestamp=timestamp,
                    text=element[1].split('\n')[1],
                    link=element[2].split()[1]))
                db.session.commit()

# add_to_db()

def model_to_dict(model):
    element = {
        'timestamp': model.timestamp,
        'text': model.text,
        'link': model.link
    }
    return element

if __name__ == '__main__':
    add_to_db()
