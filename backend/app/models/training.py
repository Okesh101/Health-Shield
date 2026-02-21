import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib

# Load dataset
data = pd.read_csv("data/clean_symptoms.csv")

# Features and target
X = data.drop("prognosis", axis=1)
y = data["prognosis"]

encoder = LabelEncoder()
y_encoded = encoder.fit_transform(y)

# # Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42
)

# # Train model
model = RandomForestClassifier(n_estimators=200)
model.fit(X_train, y_train)

# Save symptom column order
symptom_columns = X.columns.tolist()

# # Save model
joblib.dump(model, "trained_ml/disease_model.pkl")
joblib.dump(encoder, "trained_ml/label_encoder.pkl")
joblib.dump(symptom_columns, "trained_ml/symptom_columns.pkl")

print(data.head())
print(data.shape)
print(data["prognosis"].unique())
