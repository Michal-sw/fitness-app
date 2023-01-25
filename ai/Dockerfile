FROM python:3.7

WORKDIR /app

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

RUN python3 Chatbot/Model.py

CMD ["python3", "Chatbot/chatbot_server.py"]