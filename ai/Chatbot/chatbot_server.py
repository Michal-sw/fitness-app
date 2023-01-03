from flask import Flask, request
from flask_cors import CORS, cross_origin
from chatbot import predict

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/', methods=['POST'])
@cross_origin()
def get_prediction():
    data = request.json["data"]

    result = predict(data)
    return {"data": result}


app.run(debug=True)
