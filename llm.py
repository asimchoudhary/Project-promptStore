from dotenv import load_dotenv
from langchain_openai import AzureChatOpenAI
from langchain.prompts import PromptTemplate
load_dotenv()


llm  = AzureChatOpenAI(
    model_name="gpt-4o-mini",
    api_version="2023-06-01-preview"
)

template = PromptTemplate(
    input_variables=["query"],
    template = '''You are a professional assistant skilled in creating prompts and performing prompt engineering for various use cases.
Your task is to craft prompts for LLMs to make them work effectively on a given task.

Here is the user query : {query}


Requirements:
The user will provide a query as input.
Based on this query, you must ask two or three follow-up questions to gather more context about the task.
Return the response as a valid Python dictionary.
Dictionary Structure:
The response must strictly adhere to the following format:

    "query": "<user_query>",
    "q1": "<follow_up_question_1>",
    "q2": "<follow_up_question_2>",
    "q3": "<follow_up_question_3>"  # This key is optional if only two questions are asked.

Notes:
The "query" key must contain the exact user query as a string.
The keys "q1", "q2", and "q3" should hold the follow-up questions as strings.
Ensure the response is properly formatted and valid Python syntax so it can be directly parsed and executed in a Python backend.'''
)

llm_chain =  template | llm


query_instructions = '''
Generate a prompt for this query that:  
1. Specifies the task clearly.  
2. Provides appropriate context for the task.  
3. Includes any necessary instructions or formatting.  
4. Is concise and ready to use.  


'''