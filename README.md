## Kion-Hackaton

This version of the developers does not provide an example of a solution, however, it includes additional features: cloud data storage (Filebase), a neural network with a more pleasant voice acting (Silero).

>Download the code
```
$ git clone https://github.com/SavvinAkim/kion-hackaton.git
Create .env file in backend folder
```

>.flaskenv contains
```
FLASK_APP=./run.py
FLASK_DEBUG=True
DATABASE_URL=some database url
SECRET_KEY=some secret key
AWS_ACCESS_KEY_ID=your AWS key id
AWS_SECRET_ACCESS_KEY=your AWS secret key
```

>Install modules VENV
```
$ virtualenv env
$ .\env\Scripts\activate
$ pip install -r requirements.txt
```

>Start the backend_app
```
Create database 'db name' in PostgreSQL
$ flask db init
$ flask db migrate -m "Some info"
$ flask db upgrade
$ flask run
```

>Start the frontend_app
```
$ yarn install
$ yarn dev
```

At this point, the app runs at http://127.0.0.1:5173/api
