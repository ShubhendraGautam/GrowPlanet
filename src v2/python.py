import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

import sklearn as sk

from sklearn.preprocessing import StandardScaler
from sklearn import svm

import sys

from sklearn import model_selection, datasets
from sklearn.tree import DecisionTreeClassifier
import joblib
import pickle
# Save the trained model as a pickle string.

  
# Load the pickled model
model = joblib.load('model.joblib')
# print(model.predict(np.asarray((1,2,3,4,5,6,4)).reshape(1,-1)))

input_data=((sys.argv[1]),(sys.argv[2]),(sys.argv[3]),(sys.argv[4]),(sys.argv[5]),(sys.argv[6]),(sys.argv[7]))
input_data_as_numpy=np.asarray(input_data)
input_data_reshaped=input_data_as_numpy.reshape(1,-1)
prediction=model.predict(input_data_reshaped)
dic={ 20:'rice', 11:'maize',3: 'chickpea', 9:'kidneybeans', 18:'pigeonpeas', 13:'mothbeans', 14:'mungbean', 2:'blackgram', 10:'lentil', 19:'pomegranate', 1:'banana', 12:'mango', 7:'grapes', 21:'watermelon', 15:'muskmelon', 0:'apple', 16:'orange', 17:'papaya', 4:'coconut', 6:'cotton', 8:'jute', 5:'coffee'}
print(dic[(prediction[0])])
# print(prediction)