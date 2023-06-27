from training_data_preparation import get_training_data
from tensorflow.python.keras.models import Sequential
from tensorflow.python.keras.layers import Dense, Dropout
import numpy as np
from pathlib import Path

train_x, train_y = get_training_data(f'{Path().absolute()}/Chatbot/data/main_intents.json', 'main_intents')


network = Sequential([
    Dense(128, input_shape=(len(train_x[0]),), activation='relu'),
    Dropout(rate=0.2),
    Dense(256, activation='relu'),
    Dense(len(train_y[0]), activation='softmax')
])

network.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

hist = network.fit(np.array(train_x), np.array(train_y), epochs=500, batch_size=5, verbose=1)

network.save('chatbotmodelv2.h5', hist)
