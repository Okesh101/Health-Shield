# from flask import Blueprint, request, jsonify
# from sklearn.linear_model import LogisticRegression
# import joblib
# import numpy as np

# predict_bp = Blueprint('predict', __name__, url_prefix='/api/v1')

# @predict_bp.route("/predict", methods=['POST'])
# def predict():
#     if not request.json.get("userLog"):
#         return jsonify({"error": "No data provided by the user"}), 400
    
#     userLog = request.json.get("userLog")

#     return 0