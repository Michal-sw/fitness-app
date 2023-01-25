from nltk.stem.wordnet import WordNetLemmatizer
from nltk import word_tokenize


def lemmatize(sentence):
    tokens = word_tokenize(sentence)
    lem = WordNetLemmatizer()
    return [lem.lemmatize(i) for i in tokens]