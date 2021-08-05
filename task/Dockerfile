FROM python
WORKDIR /app
RUN pip install google_images_download
RUN pip install flask-jwt-extended
COPY . /app
RUN pip install -r requirements.txt
CMD ["python", "manage.py", "runserver"]
