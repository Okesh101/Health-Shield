# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.ensemble import RandomForestClassifier
# from sklearn.preprocessing import LabelEncoder
# import joblib
# import os

# def train_init():
#     # Get base project directory
#     BASE_DIR = os.path.dirname(os.path.dirname(
#         os.path.dirname(os.path.abspath(__file__))))

#     DATA_PATH = os.path.join(BASE_DIR, "app", "models", "data", "clean_symptoms.csv")
#     MODEL_DIR = os.path.join(BASE_DIR, "trained_ml")

#     # Create trained_ml folder if it doesn't exist
#     os.makedirs(MODEL_DIR, exist_ok=True)

#     # Load dataset
#     data = pd.read_csv(DATA_PATH)

#     # Features and target
#     X = data.drop("prognosis", axis=1)
#     y = data["prognosis"]

#     encoder = LabelEncoder()
#     y_encoded = encoder.fit_transform(y)

#     # # Split data
#     X_train, X_test, y_train, y_test = train_test_split(
#         X, y_encoded, test_size=0.2, random_state=42
#     )

#     # # Train model
#     model = RandomForestClassifier(n_estimators=200)
#     model.fit(X_train, y_train)

#     # Save symptom column order
#     symptom_columns = X.columns.tolist()

#     # # Save model
#     joblib.dump(model, os.path.join(MODEL_DIR, "disease_model.pkl"))
#     joblib.dump(encoder, os.path.join(MODEL_DIR, "label_encoder.pkl"))
#     joblib.dump(symptom_columns, os.path.join(
#         MODEL_DIR, "symptom_columns.pkl"))

#     print(data.head())
#     print(data.shape)
#     print(data["prognosis"].unique())
#     print("Training completed successfully.")

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import os


def train_init():

    BASE_DIR = os.path.dirname(
        os.path.dirname(
            os.path.dirname(os.path.abspath(__file__))
        )
    )

    DATA_PATH = os.path.join(BASE_DIR, "app", "models",
                             "data", "clean_symptoms.csv")
    MODEL_DIR = os.path.join(BASE_DIR, "app", "models", "trained_ml")

    os.makedirs(MODEL_DIR, exist_ok=True)

    data = pd.read_csv(DATA_PATH)

    # Clean column names
    data.columns = data.columns.str.strip()

    # ==========================
    # STEP 1: Get all unique symptoms
    # ==========================

    symptom_columns = [col for col in data.columns if col != "Disease"]

    all_symptoms = set()

    for col in symptom_columns:
        all_symptoms.update(data[col].dropna().str.strip().str.lower())

    all_symptoms = sorted(all_symptoms)

    # ==========================
    # STEP 2: Create one-hot dataframe
    # ==========================

    encoded_rows = []

    for _, row in data.iterrows():
        row_symptoms = set(
            row[symptom_columns].dropna().str.strip().str.lower()
        )

        encoded_row = [
            1 if symptom in row_symptoms else 0 for symptom in all_symptoms]
        encoded_rows.append(encoded_row)

    X = pd.DataFrame(encoded_rows, columns=all_symptoms)
    y = data["Disease"]

    # ==========================
    # STEP 3: Encode target
    # ==========================

    encoder = LabelEncoder()
    y_encoded = encoder.fit_transform(y)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42
    )

    model = RandomForestClassifier(n_estimators=200)
    model.fit(X_train, y_train)

    # ==========================
    # SAVE EVERYTHING
    # ==========================

    joblib.dump(model, os.path.join(MODEL_DIR, "disease_model.pkl"))
    joblib.dump(encoder, os.path.join(MODEL_DIR, "label_encoder.pkl"))
    joblib.dump(all_symptoms, os.path.join(MODEL_DIR, "symptom_columns.pkl"))

    print("Training completed successfully.")
    print("Total symptoms:", len(all_symptoms))
