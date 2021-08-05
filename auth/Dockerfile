FROM python:3.8-slim-buster

WORKDIR /app
ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

COPY . /app

RUN pip install -r requirements.txt

CMD ["python", "manage.py", "runserver"]
