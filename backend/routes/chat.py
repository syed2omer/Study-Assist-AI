from fastapi import APIRouter
from openai import OpenAI
from dotenv import load_dotenv
import os
import utils.store as store

load_dotenv()

router = APIRouter()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


@router.post("/chat")
async def chat(data: dict):

    try:

        question = data["question"]

        notes_context = store.stored_notes[:1000]

        prompt = f"""
        You are an AI study assistant.

        Use these notes to answer the student's question.

        NOTES:
        {notes_context}

        QUESTION:
        {question}

        Give:
        - clear explanation
        - student-friendly answer
        - examples if needed
        """

        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        answer = response.choices[0].message.content

        return {
            "answer": answer
        }

    except Exception as e:

        return {
            "error": str(e)
        }