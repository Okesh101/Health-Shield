from groq import Groq
from dotenv import load_dotenv
# from app.database.database import get_db_connection
import pandas as pd
import os
import json
import joblib
import numpy as np

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

BASE_DIR = os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))))
MODEL_DIR = os.path.join(BASE_DIR, "app", "models", "trained_ml")

model = joblib.load(os.path.join(MODEL_DIR, "disease_model.pkl"))
encoder = joblib.load(os.path.join(MODEL_DIR, "label_encoder.pkl"))
symptom_columns = joblib.load(os.path.join(MODEL_DIR, "symptom_columns.pkl"))

follow_up_prompt = """
You are a structured clinical intake assistant in an AI health logging system.

Your responsibilities:
- Briefly acknowledge the user's message (1 short sentence).
- Identify the single most prominent symptom mentioned.
- Ask exactly ONE clarifying question about:
    • duration OR
    • severity OR
    • frequency OR
    • associated symptoms.

Rules:
- Do NOT diagnose.
- Do NOT mention diseases.
- Do NOT speculate.
- If only one vague symptom is given, ask for clarification instead of interpreting.
- Keep response under 40 words.
- Use calm, neutral tone.
"""

ml_feature_prompt = """
You are a deterministic symptom extraction engine.

Task:
Extract ONLY explicitly stated symptoms from the user message.

Output STRICT JSON ONLY in this format:
{
  "symptoms": ["symptom_name"]
}

Rules:
- Use lowercase.
- Replace spaces with underscores.
- Only extract symptoms directly stated.
- Do NOT infer hidden symptoms.
- Do NOT interpret.
- Do NOT add assumptions.
- If the user says "my stomach hurts", return:
  { "symptoms": ["stomach_pain"] }
- If no symptom is clearly stated:
  { "symptoms": [] }
- Output valid JSON only. No commentary.
"""

extractor_prompt = """
You are a conservative clinical observation assistant.

You are given:
1. A list of extracted symptoms.
2. A predicted condition from a machine learning model.

Your task:
Generate a short neutral observation report (max 45 words).

STRICT RULES:
- If fewer than 2 distinct symptoms are present, DO NOT mention any disease name.
- If symptom pattern is weak or nonspecific, avoid referencing conditions.
- Do NOT diagnose.
- Do NOT provide treatment advice.
- Do NOT mention risk percentages.
- Focus only on observed symptom patterns.
- Encourage monitoring if symptoms persist or worsen.
- Maintain calm, neutral tone.
"""


# def save_assessment(user_id, transcript, extracted_symptoms, prediction_label, model_confidence, report):
#     try:
#         conn = get_db_connection()
#         cursor = conn.cursor()

#         query = '''
#             INSERT INTO assessments (user_id, transcript, extracted_symptoms, prediction_label, model_confidence, report)
#             VALUES (?, ?, ?, ?, ?, ?)
#         '''
#         cursor.execute(query, (
#             user_id,
#             transcript,
#             json.dumps(extracted_symptoms),  # Store as JSON string
#             prediction_label,
#             model_confidence,
#             report
#         ))
#         conn.commit()
#     except Exception as e:
#         print(f"Error saving assessment: {str(e)}")
#     finally:
#         if conn:
#             conn.close()


def create_feature_vector(extracted_symptoms):
    vector = []
    for symptom in symptom_columns:
        if symptom in extracted_symptoms:
            vector.append(1)
        else:
            vector.append(0)
    # 1-row DataFrame with correct column names
    df = pd.DataFrame([vector], columns=symptom_columns)
    return df   # 2D array required


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

        # ML Prediction
        feature_vector = create_feature_vector(extracted_symptoms)

        probs = model.predict_proba(feature_vector)[0]
        confidence = float(max(probs))

        prediction_index = model.predict(feature_vector)[0]
        prediction_label = encoder.inverse_transform([prediction_index])[0]

        # Generate Report
        report_response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": extractor_prompt},
                {"role": "user", "content": f"Symptoms: {extracted_symptoms}\nPredicted condition: {prediction_label}"}
            ],
            temperature=0.7,
            stream=False
        )

        report = report_response.choices[0].message.content

        # Save To Database
        # save_assessment(
        #     user_id=1,
        #     transcript=userNote,
        #     extracted_symptoms=extracted_symptoms,
        #     prediction_label=prediction_label,
        #     model_confidence=confidence,
        #     report=report
        # )

        return {
            "symptoms": extracted_symptoms,
            "prediction": prediction_label,
            "confidence": confidence,
            "report": report
        }
    except Exception as e:
        return f"Error: {str(e)}"
