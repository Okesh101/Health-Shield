from flask import Blueprint, request, jsonify
from sklearn.linear_model import LogisticRegression
import joblib
import numpy as np

predict_bp = Blueprint('predict', __name__, url_prefix='/api/v1')

@predict_bp.route("/predict", methods=['POST'])
def predict():
    return 0