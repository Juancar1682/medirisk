from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="MediRisk API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "https://medirisk-six.vercel.app"
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("readmission_model.pkl")

class PatientData(BaseModel):
    age: int
    num_medications: int
    num_diagnoses: int
    num_procedures: int
    prior_inpatient: int
    prior_emergency: int
    length_of_stay: int
    insulin: int
    discharge_type: int

@app.get("/")
def root():
    return {"status":"MediRisk is running"}

@app.post("/predict")
def predict_readmissions(patient: PatientData):
    features = np.array([[
        patient.age,
        patient.num_medications,
        patient.num_diagnoses,
        patient.num_procedures,
        patient.prior_inpatient,
        patient.prior_emergency,
        patient.length_of_stay,
        patient.insulin,
        patient.discharge_type
    ]])

    probability = model.predict_proba(features)[0][1]

    if probability < 0.30:
        risk_level = "Low"
    elif probability < 0.45:
        risk_level = "Moderate"
    else:
        risk_level = "High"

    return {
        "risk_score": round(float(probability), 3),
        "risk_level": risk_level,
        "percentage": f"{probability * 100:.1f}%"
    }