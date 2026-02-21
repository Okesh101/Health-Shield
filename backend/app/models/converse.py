from groq import Groq
from dotenv import load_dotenv
import os
import json
import joblib
import numpy as np

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

model = joblib.load("trained_ml/disease_model.pkl")
encoder = joblib.load("trained_ml/label_encoder.pkl")
symptom_columns = joblib.load("trained_ml/symptom_columns.pkl")

follow_up_prompt = """
You are a clinical intake assistant in an AI-powered health monitoring system.

Your role:
- Acknowledge the user's response briefly.
- Identify the most important symptom mentioned.
- Ask ONE clear and focused follow-up question that helps clarify duration, severity, or associated symptoms.
- Do NOT diagnose.
- Do NOT provide medical advice.
- Do NOT list multiple questions.
- Keep response under 60 words.
"""

ml_feature_prompt = """
You are a medical data extraction engine.

Your job is to extract symptoms mentioned in the user's message.

Return STRICT JSON only.

Format:
{
  "symptoms": ["symptom_name_1", "symptom_name_2"]
}

Rules:
- Use lowercase.
- Replace spaces with underscores.
- Only include physical or psychological symptoms.
- Do NOT include explanations.
- Do NOT include text outside JSON.
- If no symptoms found, return:
  { "symptoms": [] }
"""

extractor_prompt = """
You are a clinical health observation assistant.

You are given:
1. The user's reported symptoms.
2. Internally computed high-risk condition categories (not to be revealed).

Your job:
- Generate a short observational report (max 50 words).
- Do NOT mention risk percentages.
- Do NOT diagnose.
- Focus on patterns observed.
- Mention disease names only when user-provided data shows signs of that disease coming the user's way.
- Encourage monitoring or professional consultation if symptoms persist.
- Encourage user on what to look out for without causing alarm.
- Maintain calm and neutral tone.
"""


def create_feature_vector(extracted_symptoms):
    vector = []
    for symptom in symptom_columns:
        if symptom in extracted_symptoms:
            vector.append(1)
        else:
            vector.append(0)
    return np.array([vector])   # 2D array required


def follow_up_response(userLog):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": follow_up_prompt},
                {"role": "user", "content": userLog}
            ],
            temperature=0.7,
            stream=False
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {str(e)}"


def generate_prediction(userNote):
    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": ml_feature_prompt},
                {"role": "user", "content": userNote}
            ],
            temperature=0,
            stream=False
        )
        raw = response.choices[0].message.content
        parsed = json.loads(raw)

        extracted_symptoms = parsed["symptoms"]

        feature_vector = create_feature_vector(extracted_symptoms)

        prediction_index = model.predict(feature_vector)[0]
        prediction_label = encoder.inverse_transform([prediction_index])[0]

        report = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": extractor_prompt},
                {"role": "user", "content": f"Symptoms: {extracted_symptoms}\nPredicted condition: {prediction_label}"}
            ],
            temperature=0.7,
            stream=False
        )

        return {
            "symptoms": extracted_symptoms,
            "prediction": prediction_label,
            "report": report.choices[0].message.content
        }
    except Exception as e:
        return f"Error: {str(e)}"


# def extract_symptoms(predictorNote):
#     try:
#         response = client.chat.completions.create(
#             # model="gemini-1.5-pro",
#             model="llama-3.3-70b-versatile",
#             messages=[
#                 {"role": "system", "content": extractor_prompt},
#                 {"role": "user", "content": predictorNote}
#             ],
#             temperature=1,
#             max_completion_tokens=1024,
#             top_p=1,
#             stream=True,
#             stop=None
#         )
#         return response.choices[0].message.content
#     except Exception as e:
#         return f"Error generating response: {str(e)}"
