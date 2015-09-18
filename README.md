Academy
=====
###Instalation Frontend tools

You need [Nodejs](https://nodejs.org/en/download/) installed.

Install Grunt and Bower globally:
```
$ npm install -g grunt-cli
$ npm install -g bower
```
Then install all development dependencies:
```
$ npm install
$ bower install
```
Use `$ grunt build` for clean, compile and compress files.

###Instalation Backend tools

You need [Python](https://www.python.org/downloads/) and [Virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) to run a Python enviroment, then install Django and others dependencies for application:
```
$ pip install Django
...
```

###Run application for development

Run socket.io for real time features:
```
$ node io.js
```
Run Django project:
```
$ python manage.py makemigrations
$ python manage.py migrate
$ python manage.py runserver
```


