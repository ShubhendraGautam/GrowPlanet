import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import numpy as np
import pandas as pd
import sklearn as sk
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn import svm
from sklearn.metrics import accuracy_score
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn import model_selection, datasets
from sklearn.tree import DecisionTreeClassifier
import joblib
import pickle
data=pd.read_csv('Crop_recommendation.csv',header=None)
data=data.drop(0)
vectorizer = TfidfVectorizer()
vectorizer.fit(data[7])
# print(vectorizer.vocabulary_)
vector = vectorizer.transform(data[7])
# print(vector.shape)
# print(type(vector))
# print(vector.toarray())
for i in range(1,2201):
  data[7][i]=int(vectorizer.vocabulary_[data[7][i]])
for i in range(8):
  data[i]=pd.to_numeric(data[i])
X=data.drop(columns=[7],axis=1);
Y=data[7]
X_train,X_test,Y_train,Y_test=train_test_split(X,Y,test_size=0.2,stratify=Y,random_state=1)
scaler=StandardScaler()
scaler.fit(X_train)
X_train=scaler.transform(X_train)
X_test=scaler.transform(X_test)
Y.describe()
model=svm.SVC(kernel='linear')
model.fit(X_train,Y_train)
X_train_prediction=model.predict(X_train)
training_data_acuracy=accuracy_score(X_train_prediction,Y_train)
filename = "model.joblib"
joblib.dump(model, filename)
# print(training_data_acuracy)