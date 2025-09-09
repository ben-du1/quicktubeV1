from bottle import route, run, request, get,post
import pickle
from sklearn.linear_model import LinearRegression
from sentence_transformers import SentenceTransformer
import json
import numpy as np

PORT_NUMBER = 3000 # server port

with open("videospeedupmodel.pkl","rb") as f:
    model = pickle.load(f)

transformer = SentenceTransformer("all-MiniLM-L6-v2")


@post('/predict')
def predict():
    data = request.json["message"]
    data = np.array(transformer.encode(data)).reshape(1,-1)
    print(data)
    prediction = model.predict(data)[0]
    return {"prediction":str(prediction)}

if __name__ == '__main__':
    run(host='0.0.0.0',port=PORT_NUMBER, debug=True)