import nltk
from nltk.corpus import stopwords
from nltk.stem.wordnet import WordNetLemmatizer
import json

# read JSON file
with open('dictionary.json') as j:
    data = json.load(j)

word_list = []
user_requests = []
tags = []

stop_words = set(stopwords.words("english"))
custom_stop_words = ["?", "How", ":", "[", "]", "(", ")", "|", ",", "'", "I", "-", "\"", "''", "``"]

# Adding custom stop words
for custom in custom_stop_words:
    stop_words.add(custom)

# Creating a lemmatizer
lem = WordNetLemmatizer()

# Tokenizing and lemmatizing expected words and adding them to a list
for dictionary in data["dictionary"]:
    for words in dictionary["requests"]:
        tokens = nltk.word_tokenize(words)
        tokens = [lem.lemmatize(n, "v") for n in tokens if n not in stop_words]
        word_list.extend(tokens)

    # Adding the tag name of a family of words to a list
    if dictionary["tag"] not in tags:
        tags.append(dictionary["tag"])

# Keeping only unique words in the list
word_list = sorted(set(word_list))
