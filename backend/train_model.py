import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (classification_report, roc_auc_score, confusion_matrix)
import joblib


df = pd.read_csv('patient_data.csv')
X = df.drop('readmitted', axis=1)   
y = df['readmitted']                


X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"Training on {len(X_train)} patients, testing on {len(X_test)}")


model = RandomForestClassifier(
    n_estimators=100, 
    max_depth=8,         
    random_state=42,
    class_weight='balanced'
)
model.fit(X_train, y_train)
print("Model trained.")


y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1] 

print("\n--- Classification Report ---")
print(classification_report(y_test, y_pred))
print(f"ROC-AUC Score: {roc_auc_score(y_test, y_prob):.3f}")


print("\n--- Confusion Matrix ---")
print(confusion_matrix(y_test, y_pred))

importances = pd.Series(
    model.feature_importances_, 
    index=X.columns
).sort_values(ascending=False)
print("\n--- Feature Importances ---")
print(importances)


joblib.dump(model, 'readmission_model.pkl')
print("\nModel saved to readmission_model.pkl")