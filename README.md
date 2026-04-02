# MediRisk — Patient Readmission Risk Predictor

> A full-stack clinical decision support tool that predicts the probability of 30-day hospital readmission using a Random Forest ML model.

**Live Demo** → [your-vercel-url-here]

---

## The Problem

Hospitals lose billions annually to preventable readmissions. Medicare penalizes them for it. Care teams often have no systematic way to identify who's at highest risk before a patient walks out the door.

MediRisk gives clinicians a fast, data-driven risk signal at discharge.

---

## What It Does

- Takes patient data as input — age, medications, diagnoses, procedures, prior visits, and more
- Runs it through a trained Random Forest classifier
- Returns a readmission risk probability and risk band (Low / Moderate / High)
- Built for clinical workflows — fast, readable output, no data science background required

---

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React, Tailwind CSS |
| Backend | Python, FastAPI |
| ML Model | Random Forest (scikit-learn) |
| Data | Synthetically generated patient dataset |
| Deployment | Vercel (frontend) |

---

## Project Structure

```
medirisk/
├── backend/
│   ├── main.py              # FastAPI app + prediction endpoint
│   ├── train_model.py       # Model training pipeline
│   ├── generate_data.py     # Synthetic patient data generation
│   ├── readmission_model.pkl # Trained Random Forest model
│   └── patient_data.csv     # Training dataset
└── frontend/
    └── src/
        ├── components/
        │   ├── PatientForm.jsx   # Patient data input form
        │   ├── DataEntry.jsx     # Form field components
        │   └── RiskResult.jsx    # Risk score output display
        └── App.jsx
```

---

## Running Locally

### Backend

```bash
cd backend
pip install fastapi uvicorn scikit-learn pandas numpy
uvicorn main:app --reload
```

API runs at `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm start
```

App runs at `http://localhost:3000`

---

## ML Model

The Random Forest classifier was trained on a synthetically generated dataset of patient records with the following features:

- Age
- Number of medications
- Number of diagnoses
- Number of procedures
- Prior inpatient visits
- Prior emergency visits
- Length of stay
- Insulin use
- Discharge type

Model is evaluated using AUC-ROC. Feature importance analysis is included in `train_model.py`.

---

## Why I Built This

I'm a full-stack engineer (React, Node, Express) who kept seeing healthcare tech job postings that required Python, data science, and ML experience — and had none of it.

Instead of waiting, I built MediRisk over 30 days to close that gap. This project is the result of learning Python, FastAPI, and machine learning from scratch while building something that solves a real clinical problem.

---

## Author

**Juan** — Full Stack Engineer  
[GitHub](https://github.com/Juancar1682) · [LinkedIn](https://linkedin.com/in/your-handle-here)
