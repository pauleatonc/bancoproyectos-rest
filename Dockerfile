FROM python:3.11-slim-bullseye AS build
WORKDIR /projectbank
COPY . .

RUN pip install -r requirements.txt
RUN python manage.py makemigrations
RUN python manage.py migrate
RUN python manage.py runserver