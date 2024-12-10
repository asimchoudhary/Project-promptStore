from flask import Flask , request , jsonify
from flask_cors import CORS
from llm import llm_chain
import json
import re


app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.post("/generate-questions")
def generate_questions():
    data = request.json
    query = data['query']
    response = llm_chain.invoke(query)
    response_str = response.content.strip()
    response_list = json.loads(response_str)
    return jsonify({"questions": response_list})


    


if __name__ == '__main__':
    app.run(debug=True)