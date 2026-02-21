from flask import Blueprint, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def follow_up_response(userLog):
    try:
        response = client.chat.completions.create(
            # model="gemini-1.5-pro",
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful and precise assistant for health-related queries."},
                {"role": "user", "content": userLog}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
            stop=None
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating response: {str(e)}"
    
def generate_ml_features(userNote):
    try:
        response = client.chat.completions.create(
            # model="gemini-1.5-pro",
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful and precise assistant for health-related queries."},
                {"role": "user", "content": userNote}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
            stop=None
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating response: {str(e)}"

def extract_symptoms(predictorNote):
    try:
        response = client.chat.completions.create(
            # model="gemini-1.5-pro",
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a helpful and precise assistant for health-related queries."},
                {"role": "user", "content": predictorNote}
            ],
            temperature=1,
            max_completion_tokens=1024,
            top_p=1,
            stream=True,
            stop=None
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error generating response: {str(e)}"