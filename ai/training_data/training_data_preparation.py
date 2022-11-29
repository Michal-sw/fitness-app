import random

import nltk
import numpy as np
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import json
import pickle


def prepare_word(intent_file_dir, file_name):
    # read JSON file
    with open(intent_file_dir) as j:
        data = json.load(j)

    word_list = []
    sentences = []
    tags = []

    stop_words = set(stopwords.words("english"))
    custom_stop_words = ["?", "How", ":", "[", "]", "(", ")", "|", ",", "'", "I", "-", "\"", "''", "``"]

    # Adding custom stop words
    for custom in custom_stop_words:
        stop_words.add(custom)

    # Creating a lemmatizer
    lem = WordNetLemmatizer()

    # Tokenizing and lemmatizing expected words and adding them to a list
    for dictionary in data:
        for patterns in dictionary["patterns"]:
            tokens = nltk.word_tokenize(patterns)
            tokens = [lem.lemmatize(n, "v") for n in tokens if n not in stop_words]
            word_list.extend(tokens)
            sentences.append((tokens, dictionary['tag']))
            tags.append(dictionary['tag'])

    # Keeping only unique words in the list
    word_list = sorted(set(word_list))
    tags = sorted(set(tags))

    # Serialize data
    pickle.dump(word_list, open(f'./pickles/{file_name}_word_list.pkl', 'wb'))
    pickle.dump(word_list, open(f'./pickles/{file_name}_tags.pkl', 'wb'))

    training_data = []

    # Create bag of words to convert sentences into number for the AI
    for sentence in sentences:
        bag_of_words = []
        patterns = [i.lower() for i in sentence[0]]

        for word in word_list:
            if word in patterns:
                bag_of_words.append(1)
            else:
                bag_of_words.append(0)

        output = list([0] * len(tags))
        output[tags.index(sentence[1])] = 1

        training_data.append([bag_of_words, output])

    random.shuffle(training_data)
    training_data = np.array(training_data)
    train_setx = list(training_data[:, 0])
    train_sety = list(training_data[:, 1])

    return [train_setx, train_sety]


print(prepare_word('./data/basic_intents.json', 'basic_intents'))
