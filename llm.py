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
    template = '''

        You are a professional assistant skilled in creating prompts for various use cases. 

The user has provided the following query:  
"{query}"

Generate a prompt for this query that:  
1. Specifies the task clearly.  
2. Provides appropriate context for the task.  
3. Includes any necessary instructions or formatting.  
4. Is concise and ready to use.  
'''
)

llm_chain =  template | llm

