from flask import Blueprint, request, jsonify
from app.models.converse import follow_up_response, generate_ml_features, extract_symptoms

chat_bp = Blueprint('chat', __name__, url_prefix='/api/v1/chat')

@chat_bp.route('/follow-up', methods=['POST'])
def follow_up_route():
    if not request.json.get("userLog"):
        return jsonify({"error": "No data provided by the user"}), 400
    
    userLog = request.json.get("userLog")

    return

@chat_bp.route('/generate-ml-feat', methods=['POST'])
def generate_ml_features_route():
    if not request.json.get("userLog"):
        return jsonify({"error": "No data provided by the user"}), 400
    
    userLog = request.json.get("userLog")

    return


@chat_bp.route('/extract-symptoms', methods=['POST'])
def extract_symptoms_route():
    if not request.json.get("userLog"):
        return jsonify({"error": "No data provided by the user"}), 400

    userLog = request.json.get("userLog")

    return
