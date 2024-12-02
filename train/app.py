import os
import streamlit as st
import pandas as pd
import requests
import joblib  
from dotenv import load_dotenv
from sklearn.exceptions import NotFittedError

# Load environment variables
load_dotenv()

# Load the dataset
file_path = r"/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/healthcare_dataset.csv"
df = pd.read_csv(file_path)

# Filter dataset to focus on Diabetes patients (as per your original logic)
 

# Ensure SERP API key is loaded
serp_api_key = os.getenv("SERP_API_KEY")
if not serp_api_key:
    raise ValueError("SERP API key not found. Make sure it's defined in the .env file.")

# Paths to the model, label encoders, and scaler
model_path = r"/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/model.pkl"
label_encoders_path = r"/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/label_encoders.pkl"
scaler_path = r"/Users/kartiksangwan/Desktop/projects/react/MINOR/doc/train/scaler.pkl"

# Load model and preprocessing tools
model = joblib.load(model_path)
label_encoders = joblib.load(label_encoders_path)
scaler = joblib.load(scaler_path)

# Function to fetch patient info
def get_patient_info(name):
    patient = df[df['Name'].str.lower() == name.lower()]
    if not patient.empty:
        required_columns = ['Name', 'Age', 'Gender', 'Blood Type', 'Medical Condition', 'Billing Amount']
        missing_cols = [col for col in required_columns if col not in patient.columns or patient[col].isnull().any()]
        if missing_cols:
            st.error(f"Missing or incomplete data for patient: {', '.join(missing_cols)}")
            return None
        return patient
    else:
        return None

# Function to filter patients by condition
def get_patients_by_condition(condition, limit=10):
    return df[df['Medical Condition'].str.lower() == condition.lower()].head(limit)

# Function to generate recommendations
def generate_recommendations(medical_condition):
    url = f"https://serpapi.com/search.json?q={medical_condition}+treatment&api_key={serp_api_key}"
    try:
        response = requests.get(url)
        data = response.json()

        if "organic_results" in data:
            results = data["organic_results"]
            recommendations = "\n\n".join([result["snippet"] for result in results if "snippet" in result])
            
            medicines = []
            sentences = recommendations.split('.')
            for sentence in sentences:
                if 'medication' in sentence.lower() or 'medicine' in sentence.lower() or 'insulin' in sentence.lower() or 'metformin' in sentence.lower():
                    medicines.append(sentence.strip())
            return medicines
        else:
            return []
    except Exception as e:
        return [f"Error generating recommendations: {str(e)}"]

# Function to predict readmission
def predict_readmission(patient_info):
    required_features = ['Age', 'Billing Amount', 'Gender', 'Blood Type', 'Medical Condition']
    for feature in required_features:
        if feature not in patient_info.columns:
            raise ValueError(f"Missing feature: {feature}")

    patient_data = patient_info[required_features].copy()

    # Apply label encoding and scaling
    patient_data['Gender'] = label_encoders['Gender'].transform(patient_data['Gender'])
    patient_data['Blood Type'] = label_encoders['Blood Type'].transform(patient_data['Blood Type'])
    patient_data['Medical Condition'] = label_encoders['Medical Condition'].transform(patient_data['Medical Condition'])
    patient_data[['Age', 'Billing Amount']] = scaler.transform(patient_data[['Age', 'Billing Amount']])

    patient_data_array = patient_data.values
    prediction = model.predict(patient_data_array)

    if prediction[0] == 1:
        st.write("**Readmission Risk:** High. The patient is at a higher risk of readmission.")
    else:
        st.write("**Readmission Risk:** Low. The patient is at a lower risk of readmission.")

# Streamlit UI elements
st.title("Healthcare Patient Search and AI-Driven Recommendations")

# Sidebar to filter patients by condition
diseases = ["Diabetes", "Obesity", "Arthritis", "Hypertension", "Asthma"]
selected_disease = st.sidebar.radio("Select a Disease", diseases)

if selected_disease:
    st.sidebar.subheader(f"Top 10 Patients with {selected_disease}")
    patients_with_disease = get_patients_by_condition(selected_disease)

    if not patients_with_disease.empty:
        for index, row in patients_with_disease.iterrows():
            st.sidebar.write(f"- {row['Name']}")
    else:
        st.sidebar.write("No patients found with this condition.")

# Main area to search patient by name
patient_name = st.text_input("Enter Patient Name")
if patient_name:
    patient_info = get_patient_info(patient_name)
    if patient_info is not None:
        st.subheader("Patient Details")
        st.write(f"**Name:** {patient_info['Name'].values[0]}")
        st.write(f"**Age:** {patient_info['Age'].values[0]}")
        st.write(f"**Gender:** {patient_info['Gender'].values[0]}")
        st.write(f"**Blood Type:** {patient_info['Blood Type'].values[0]}")
        st.write(f"**Medical Condition:** {patient_info['Medical Condition'].values[0]}")
        st.write(f"**Billing Amount:** {patient_info['Billing Amount'].values[0]}")

        medical_condition = patient_info['Medical Condition'].values[0]
        st.subheader("AI-Driven Recommendations")
        medicines = generate_recommendations(medical_condition)

        if medicines:
            st.write("**Recommended Medicines:**")
            for med in medicines:
                st.write(f"- {med}")
        else:
            st.write("No specific recommendations found.")

        st.subheader("Model Prediction: Patient Readmission Risk")
        predict_readmission(patient_info)
    else:
        st.error("Patient not found!")
else:
    st.info("Please enter a patient name to search.")
