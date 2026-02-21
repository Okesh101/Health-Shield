import sqlite3
from flask import Flask, request, jsonify, Blueprint
from app.database.database import get_db_connection
import hashlib
import json

from dbm import sqlite3

auth_bp = Blueprint('auth', __name__, url_prefix='/api/v1/auth')


def simple_hasher(password):
    password_bytes = password.encode('utf-8')
    # Create the hash object and get the hexadecimal string
    return hashlib.sha256(password_bytes).hexdigest()


def save_user_details(email, fullname, hash_pass) -> dict:
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = "INSERT INTO users (email, fullname, password_hash) VALUES (?, ?, ?)"
        cursor.execute(query, (email, fullname, hash_pass))

        db.commit()
        return {"status": "success", "code": 201}
    except sqlite3.IntegrityError:
        return {"error": "Email already registered", "code": 400}
    except sqlite3.Error as e:
        return {"error": f"Error saving user details: {e}", "code": 500}
    finally:
        if db:
            db.close()


def fetch_user_details(email, hash_pass):
    try:
        db = get_db_connection()
        cursor = db.cursor()

        query = "SELECT password_hash FROM users WHERE email = ?"
        cursor.execute(query, (email,))

        row = cursor.fetchone()
        if row is None:
            return False
        if row['password_hash'] != hash_pass:
            return False
        return True
    except sqlite3.Error as e:
        return {"error": f"Error checking credentials: {e}", "code": 500}
    finally:
        if db:
            db.close()


@auth_bp.route("/signup", methods=['POST'])
def signup():
    if not request.json.get("formData"):
        return jsonify({"error": "No data provided"}), 400

    formData = request.json.get("formData")
    fullName = formData.get("fullName", "")
    email = formData.get("email", "")
    password = formData.get("password", "")
    if not fullName or not email or not password:
        return jsonify({"error": "Missing important credentials"}), 400
    hashed_password = simple_hasher(password)
    returnValue = save_user_details(email, fullName, hashed_password)
    return jsonify(returnValue), returnValue["code"]


@auth_bp.route("/login", methods=['POST'])
def login():
    if not request.json.get("formData"):
        return jsonify({"error": "No credentials recieved"}), 400
    formData = request.json.get("formData")
    email = formData.get("email", "")
    password = formData.get("password", "")
    if not email or not password:
        return jsonify({"error": "Missing important credentials"}), 400
    hashed_password = simple_hasher(password)
    returnValue = fetch_user_details(email, hashed_password)
    if returnValue:
        return jsonify({"status": "success", "code": 200}), 200
    return jsonify({"error": "Invalid credentials"}), 401


# def save_voice_assessment(user_id, transcript, score):
#     db = get_db_connection()
#     cursor = db.cursor()

#     query = "INSERT INTO assessments (user_id, transcript, risk_score) VALUES (?, ?, ?)"
#     cursor.execute(query, (user_id, transcript, score))

#     db.commit()
#     db.close()
#     return {"status": "success"}
