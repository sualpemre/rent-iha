FROM python:3.9-alpine

WORKDIR /code

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1 


COPY .env .
COPY backend/ .
RUN pip install --no-cache-dir -r requirements.txt



EXPOSE 8000

RUN python manage.py makemigrations 


CMD ["gunicorn", "--bind", ":8000", "--workers", "3", "core.wsgi:application"]