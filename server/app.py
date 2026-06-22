from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from dotenv import load_dotenv
import os

load_dotenv()

print("KEY =", os.getenv("GEMINI_API_KEY"))
print("CURRENT DIR =", os.getcwd())


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Input(BaseModel):
    problem: str
    code: str

@app.post("/analyze")
def analyze(data: Input):

    prompt = f"""
    You are a DSA mentor.

    Problem:
    {data.problem}

    Code:
    {data.code}

    Return:

    Pattern:
    Mistakes:
    Hint:
    Time Complexity:
    """

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt
    )
    return {
    "response": response.text
}
# uvicorn app:app --reload+