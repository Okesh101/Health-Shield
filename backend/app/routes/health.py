from flask import Flask, request, jsonify, Blueprint

health_bp = Blueprint('health', __name__, url_prefix='/api/v1')

@health_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'}), 200