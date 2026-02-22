# AI Health Partner

AI Health Partner is a multi-platform health assistant application with a backend API, web frontend, and mobile app. It leverages AI and machine learning to provide health-related services, including chat, symptom assessment, and predictions.

## Project Structure

```
AI-Health-Partner/
├── backend/      # Python Flask API and ML models
├── frontend/     # React web app (Vite)
├── mobile/       # React Native mobile app (Expo)
```

### Backend
- **Location:** `backend/`
- **Tech:** Python, Flask, SQLAlchemy, OpenAI, Google GenAI, ML libraries
- **Features:**
  - REST API for health chat, authentication, prediction, transcription
  - ML models for symptom analysis and health prediction
  - Database integration (SQLite)
- **Key files:**
  - `app.py`: Main Flask app
  - `requirements.txt`: Python dependencies
  - `app/`: Core modules (routes, models, database)
  - `Dockerfile`: Containerization

#### Backend Setup
1. Navigate to `backend/`
2. Create and activate virtual environment:
	```bash
	python3 -m venv env
	source env/bin/activate
	```
3. Install dependencies:
	```bash
	pip install -r requirements.txt
	```
4. Run the server:
	```bash
	python app.py
	```
5. (Optional) Use Docker:
	```bash
	docker build -t ai-health-backend .
	docker run -p 5000:5000 ai-health-backend
	```

### Frontend
- **Location:** `frontend/`
- **Tech:** React, Vite, Sass
- **Features:**
  - User dashboard, login, health assessment
  - Responsive UI
- **Key files:**
  - `src/`: Main source code
  - `App.jsx`, `components/`, `scss/`
  - `package.json`: JS dependencies

#### Frontend Setup
1. Navigate to `frontend/`
2. Install dependencies:
	```bash
	npm install
	```
3. Run development server:
	```bash
	npm run dev
	```

### Mobile App (a mere UI not a working Application)
- **Location:** `mobile/my-app/`
- **Tech:** React Native, Expo
- **Features:**
  - Mobile health assistant
  - Native UI components
- **Key files:**
  - `app/`, `components/`, `hooks/`, `assets/`
  - `package.json`: JS dependencies

#### Mobile Setup
1. Navigate to `mobile/my-app/`
2. Install dependencies:
	```bash
	npm install
	```
3. Start Expo server:
	```bash
	npm start
	```
4. Run on device/emulator:
	```bash
	npm run android   # For Android
	npm run ios       # For iOS
	npm run web       # For web
	```

## Features
- AI-powered health chat and assessment
- Symptom prediction and analysis
- User authentication
- Voice transcription
- Dashboard and reports

## Requirements
- Python 3.12+
- Node.js 18+
- npm 9+
- Docker (optional)

## License
MIT

---
For more details, see subfolder READMEs and code comments.
