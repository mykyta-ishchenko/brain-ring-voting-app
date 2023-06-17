FROM python:3.10-slim

WORKDIR .

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
EXPOSE 80

CMD ["python3", "run.py"]
#CMD ["gunicorn", "--bind", "0.0.0.0:80", "-w", "1", "app:create_app()"]
