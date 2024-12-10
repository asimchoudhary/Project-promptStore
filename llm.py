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

return the follow-up questions as a list of strings in the below format
[
    "Follow-up question 1",
    "Follow-up question 2",
    "Follow-up question 3"
]
'''
)

llm_chain =  template | llm


query_instructions = '''
Generate a prompt for this query that:  
1. Specifies the task clearly.  
2. Provides appropriate context for the task.  
3. Includes any necessary instructions or formatting.  
4. Is concise and ready to use.  


'''