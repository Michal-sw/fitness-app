import json
import pickle
import random

from tensorflow.python.keras.models import load_model
from utils.bag_of_words import bag_of_words
from utils.lemmatize import lemmatize
import numpy as np

intents = json.loads(open('../training_data/data/main_intents.json').read())

word_list = pickle.load(open('../training_data/pickles/main_intents_word_list.pkl', 'rb'))
tags = pickle.load(open('../training_data/pickles/main_intents_tags.pkl', 'rb'))
network = load_model('../training_data/chatbotmodelv2.h5')

probability = 0.5


def predict(sentence):
    bag = bag_of_words(lemmatize(sentence), word_list)
    result = network.predict(np.array([bag]))[0]

    threshold = 0

    result = [[i, r] for i, r in enumerate(result) if r > threshold]
    result.sort(key=lambda x: x[1], reverse=True)
    return_list = []

    for r in result:
        if r[1] > probability:
            return_list.append({'intent': tags[r[0]], 'probability': str(r[1])})

    if len(return_list) == 0:
        return 'Unknown'

    for intent in intents:
        if intent["tag"] == return_list[0]["intent"]:
            return random.choice(intent["responses"])
