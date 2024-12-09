from flask import Flask , request , jsonify
from llm import llm_chain


app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

@app.route("/generate-prompt")
def generate_prompt():
    query = request.args.get("query")
    response = llm_chain.invoke(query)

    return jsonify({"Promt": response.content})



    


if __name__ == '__main__':
    app.run(debug=True)