from flask import Blueprint, request, jsonify
from app.models.converse import follow_up_response, generate_prediction

chat_bp = Blueprint('chat', __name__, url_prefix='/api/v1/chat')

@chat_bp.route('/follow-up', methods=['POST'])
def follow_up_route():
    userLog = request.json.get("userLog")
    if not userLog:
        return jsonify({"error": "No data provided"}), 400
    
    response = follow_up_response(userLog)
    return jsonify({"response": response})

@chat_bp.route('/generate-prediction', methods=['POST'])
def generate_prediction():
    userLog = request.json.get("userLog")
    if not userLog:
        return jsonify({"error": "No data provided"}), 400
    
    result = generate_prediction(userLog)
    return jsonify(result)


# @chat_bp.route('/extract-symptoms', methods=['POST'])
# def extract_symptoms_route():
#     if not request.json.get("userLog"):
#         return jsonify({"error": "No data provided by the user"}), 400

#     userLog = request.json.get("userLog")

#     return
