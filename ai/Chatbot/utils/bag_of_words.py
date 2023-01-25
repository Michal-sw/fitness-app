import numpy as np


def bag_of_words(tokens, word_list):
    bag = []
    patterns = [i.lower() for i in tokens]

    for word in word_list:
        if word.lower() in patterns:
            bag.append(1)
        else:
            bag.append(0)

    return np.array(bag)
