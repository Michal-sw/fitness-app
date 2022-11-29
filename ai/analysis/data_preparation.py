import json
import random

import pandas as pd


fitness_data = pd.read_csv('fitness_exercises.csv', sep=',')
bodyPart = []
equipment = []
target = []
intents = []

for index, row in fitness_data.iterrows():
    bodyPart.append(row[0])
    equipment.append(row[1])
    target.append(row[5])

bodyPart = list(set(bodyPart))
equipment = list(set(equipment))
target = list(set(target))

responsePrefix = ['What do You think of', 'Have you heard of', 'You should try', 'I would suggest', 'You should do',
                  'Maybe..']

for i in bodyPart:
    intent = {
        'tag': i,
        'patterns': [f'Do You know some {i} exercises', f'I would like to train {i}',
                     f'Give me some {i} recommendations',f'What about {i}', f'Maybe some {i}', f'Anything for {i}', i,
                     f'I want to do {i}'],
        'responses': [f'{random.choice(responsePrefix)} {n}' for n in fitness_data.loc[fitness_data['bodyPart'] == i]["name"]]
    }
    intents.append(intent)


for i in equipment:
    intent = {
        'tag': i,
        'patterns': [f'I would like to try an exercise using {i}', f'For what exercise do I need {i}',
                     f'Any recommendations when using {i}', f'I want to do something with {i}',
                     f'What can I do with {i}', i, f'I want to use {i}', f'Lets try something with {i}'],
        'responses': [f'{random.choice(responsePrefix)} {n}' for n in fitness_data.loc[fitness_data['equipment'] == i]["name"]]
    }
    intents.append(intent)


for i in target:
    intent = {
        'tag': i,
        'patterns': [f'I want to train {i}', f'Find some {i} exercises', f'Any {i} recommendations', f'Lets focus on {i}',
                     f'Lets do some {i}', i, f'What can I do for {i}', f'Any exercises for {i}'],
        'responses': [f'{random.choice(responsePrefix)} {n}' for n in fitness_data.loc[fitness_data['target'] == i]["name"]]
    }
    intents.append(intent)

with open('fitness_intents.json', 'w') as file:
    json.dump(intents, file)
