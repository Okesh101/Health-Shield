import requests
import datetime as dt
from flask_sqlalchemy import SQLAlchemy
current_time = dt.datetime.now()

db = SQLAlchemy()

def continuous_ping():
    url = "https://health-shield.onrender.com/api/v1/health"
    try:
        response = requests.get(url, timeout=10)
        print(f"Ping successful: {response.status_code}")
        print(f"Server is alive at {current_time.now()}")
    except Exception as e:
        print(f"Ping failed: {e}")
