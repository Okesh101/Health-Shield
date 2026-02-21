from flask import Flask
from flask_cors import CORS
# from google_genai import Client


def create_app():
    app = Flask(__name__)
    CORS(app)

    # Declaring Blueprints
    from app.routes.health import health_bp
    from app.routes.transcribe import transcribe_bp
    from app.routes.auth import auth_bp
    from app.database.database import init_db
    from app.routes.predict import predict_bp
    from app.routes.chat import chat_bp

    init_db()

    app.register_blueprint(health_bp)
    app.register_blueprint(transcribe_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(predict_bp)
    app.register_blueprint(chat_bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='127.0.0.1', port=5000)
