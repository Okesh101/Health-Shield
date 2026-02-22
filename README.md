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
- **Tech:** React, Vite, Sass, Framer-motion
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
	npm run android   # For Android(UI not a working Application)
	npm run ios       # For iOS(UI not a working Application)
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

#CAVISTA 2026 HACKATHON DASHBOARD

![](https://github.com/Ebenezer080925/Cavista2026-Hacktahon-Heathshield-Dashboard/blob/main/Screenshot%202026-02-22%20074258.png)

#                                                HEALTH SHIELD DASHBOARD REPORT
##    Empowering Early Detection Through Predictive Analytics
##   Introduction
     The Health Shield Dashboard is an automated disease-symptom intelligence system designed to support early detection and awareness. This solution 
focuses on individuals who are already familiar with a disease they frequently experience but may not clearly remember all associated symptoms.
    The dashboard provides an interactive, user-friendly environment where selecting any disease dynamically updates visual elements to assist in
symptom verification and confirmation.

##           Dashboard Objective
###  The primary goal of this automation system is to:
    -Improve early disease awareness
    -Help users confirm symptoms quickly
    -Provide visual identification support
    -Enable gender-based disease pattern analysis
    -Present structured symptom information for deeper verification
This system currently supports 20 distinct diseases, all integrated into an interactive analytics framework.
 ##   Automation Functionality
### The dashboard is fully dynamic and automated:
### Disease Selection Automation

When a user selects a disease (from the bar chart, slicer, or table):
    The corresponding disease image automatically appears.
    The Top 3 most common symptoms are instantly displayed.
    The detailed symptom table updates to show additional symptoms for deeper confirmation.
This allows users to:
   Quickly compare their physical condition with the disease image.
   Verify the most critical symptoms immediately.
   Review additional symptoms in the table for further validation.

## Key Insights
-The system currently automates detection across 20 distinct diseases.
-Male individuals appear to have a higher prevalence rate across the dataset.
-The dynamic filtering allows real-time disease intelligence.
-The integration of image recognition with symptom ranking improves user confidence in early detection.

## Predictive Analytics Value

### This dashboard goes beyond static reporting by:
    -Automating disease-symptom mapping
    -Enabling interactive filtering
    -Supporting drill-down analysis
    -Structuring medical information into actionable insights

It acts as a lightweight decision-support system that enhances personal health awareness.
