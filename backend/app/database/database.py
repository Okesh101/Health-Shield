import sqlite3
import os

# Get the path to where this file lives
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Put the actual .db file in the same folder as database.py
DB_PATH = os.path.join(BASE_DIR, "health_ai.db")


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    # This line lets you access columns by name: row['username']
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_db_connection()

    # Create User table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE,
            fullname TEXT,
            password_hash TEXT
        )
    ''')
    conn.commit()
    conn.close()
