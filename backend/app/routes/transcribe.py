from flask import Blueprint, request, jsonify
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

transcribe_bp = Blueprint('transcribe', __name__, url_prefix='/api/v1')


@transcribe_bp.route('/transcribe', methods=['POST'])
async def transcribe_audio():
    if 'audio' not in request.files:
        return jsonify({"error": "No file"}), 400
    
    audio_file = request.files['audio']

    try:
        translation = client.audio.transcriptions.create(
            file=(audio_file.filename, audio_file.read()),
            model="whisper-large-v3-turbo",
        )
        print(translation.text)
        return jsonify({"transcribed_text": translation.text}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
