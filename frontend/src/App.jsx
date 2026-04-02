import { useState } from "react";
import PatientForm from "./components/PatientForm";
import RiskResult from "./components/RiskResult";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (patientData) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        "https://medirisk-api.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patientData),
        },
      );

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.log("API call failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <h1 className="text-xl font-semibold text-slate-800">
          MediRisk <span className="text-blue-600">·</span> 30-Day Readmission
          Predictor
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Clinical decision support — for care team use only
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <PatientForm onSubmit={handleSubmit} loading={loading} />
          {result && <RiskResult result={result} />}
        </div>
      </main>
    </div>
  );
}

export default App;
