from flask import Flask
from flask_cors import CORS
import pytz
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.executors.pool import ThreadPoolExecutor
from apscheduler.jobstores.sqlalchemy import SQLAlchemyJobStore
from app.models.training import train_init
from app.extensions import db, continuous_ping
# import os


def create_app():
    app = Flask(__name__)
    CORS(app)

    # SCHEDULER CONFIG
    jobstores = {
        'default': SQLAlchemyJobStore(
            url='sqlite:///forge_scheduler.db'
        )
    }

    executors = {
        'default': ThreadPoolExecutor(10)
    }

    job_defaults = {
        'coalesce': False,
        'max_instances': 1
    }

    scheduler = BackgroundScheduler(
        jobstores=jobstores,
        executors=executors,
        job_defaults=job_defaults,
        timezone=pytz.timezone("Africa/Lagos")
    )

    # Declaring Blueprints
    from app.routes.health import health_bp
    from app.routes.transcribe import transcribe_bp
    from app.routes.auth import auth_bp
    from app.database.database import init_db
    from app.routes.chat import chat_bp

    init_db()

    app.register_blueprint(health_bp)
    app.register_blueprint(transcribe_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(chat_bp)

    scheduler.add_job(id='ping_server',
                      func=continuous_ping,
                      trigger='interval',
                      minutes=10,
                      max_instances=1,  # Ensures only one dispatcher runs at a time
                      replace_existing=True
                      )

    scheduler.start()

    print("📅 Scheduler started with persisted job store")
    print(scheduler.get_jobs())

    return app


if __name__ == '__main__':
    train_init()
    app = create_app()
    app.run(debug=False, use_reloader=False)
