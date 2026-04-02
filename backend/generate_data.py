import pandas as pd
import numpy as np

np.random.seed(42)
n = 2000

def generate_patient_data(n):
    age = np.random.normal(65, 15, n).clip(18, 95).astype(int)
    num_medications = np.random.poisson(12, n).clip(1, 40)
    num_diagnoses = np.random.poisson(7, n).clip(1, 16)
    num_procedures = np.random.poisson(2, n).clip(0, 6)
    num_outpatient_visits= np.random.poisson(2, n).clip(0, 8)
    prior_inpatient = np.random.poisson(0.8, n).clip(0, 10)
    prior_emergency = np.random.poisson(0.5, n).clip(0, 5)
    length_of_stay = np.random.lognormal(1.8, 0.6, n).clip(1, 20).astype(int)
    insulin = np.random.binomial(1, 0.35, n)
    discharge_type = np.random.choice([0, 1, 2], n, p=[0.7, 0.25, 0.05])

    risk = (
        0.05
        + (age > 70) * 0.10
        + (num_medications > 15) * 0.08
        - (num_outpatient_visits > 2) * 0.05
        + (num_diagnoses > 9) * 0.10
        + prior_inpatient * 0.06
        + prior_emergency * 0.04
        + (length_of_stay < 2) * 0.07 
        + (length_of_stay > 10) * 0.05         
        + insulin * 0.06
        + (discharge_type == 2) * 0.20          
    ).clip(0, 0.95)

    readmitted = np.random.binomial(1, risk, n)

    return pd.DataFrame({
        'age': age,
        'num_medications': num_medications,
        'num_diagnoses': num_diagnoses,
        'num_outpatient_visits': num_outpatient_visits,
        'num_procedures': num_procedures,
        'prior_inpatient': prior_inpatient,
        'prior_emergency': prior_emergency,
        'length_of_stay': length_of_stay,
        'insulin': insulin,
        'discharge_type': discharge_type,
        'readmitted': readmitted
    })

df = generate_patient_data(n)
df.to_csv('patient_data.csv', index=False)
print(df.head())
print(f"\nReadmission rate: {df['readmitted'].mean():.1%}")