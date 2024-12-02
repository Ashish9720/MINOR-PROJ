import os
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import joblib
from dotenv import load_dotenv

load_dotenv()
file_path = r"/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/healthcare_dataset.csv"
df = pd.read_csv(file_path)
df = df[df['Medical Condition'] == 'Diabetes']

def preprocess_data(df):
    label_encoders = {}
    categorical_cols = ['Gender', 'Blood Type', 'Medical Condition', 'Doctor', 'Hospital', 'Insurance Provider']
    for col in categorical_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col].astype(str))
        label_encoders[col] = le

    scaler = StandardScaler()
    numerical_cols = ['Age', 'Billing Amount']
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])
    
    return df, label_encoders, scaler

df, label_encoders, scaler = preprocess_data(df)
df['Readmitted'] = np.random.randint(0, 2, df.shape[0])
X = df[['Age', 'Gender', 'Blood Type', 'Medical Condition', 'Billing Amount']]
y = df['Readmitted']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy for Diabetes Patients: {accuracy * 100:.2f}%")

model_path = r'/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/model.pkl'
label_encoders_path = r'/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/label_encoders.pkl'
scaler_path = r'/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/scaler.pkl'

joblib.dump(model, model_path)
joblib.dump(label_encoders, label_encoders_path)
joblib.dump(scaler, scaler_path)

print("Model and preprocessing tools saved successfully.")