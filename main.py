from flask import Flask , request , jsonify
from flask_cors import CORS
from llm import llm_chain_qa , llm_chain_prompt_without_context
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
    response = llm_chain_qa.invoke(query)
    response_str = response.content.strip()
    response_list = json.loads(response_str)
    return jsonify({"questions": response_list})

@app.post("/generate-prompt")
def generate_prompt():
    data = request.json
    query = data['query']
    questions = data['questions']
    answers = data['answers']
    print(questions)
    print(answers)

    return "hello",200

@app.post("/generate-prompt-without-context")
def generate_prompt_without_context():
    data = request.json
    query = data['query']
    response = llm_chain_prompt_without_context.invoke(query)
    response_str = response.content.strip()
    return jsonify({"prompt": response_str})

    


if __name__ == '__main__':
    app.run(debug=True)