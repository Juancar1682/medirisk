import { useState } from "react";
import DataEntry from "./DataEntry";

export default function PatientForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    age: "",
    num_medications: "",
    num_diagnoses: "",
    num_procedures: "",
    prior_inpatient: "",
    prior_emergency: "",
    length_of_stay: "",
    insulin: "0",
    discharge_type: "0",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const patientData = {
      age: parseInt(form.age) || 0,
      num_medications: parseInt(form.num_medications) || 0,
      num_diagnoses: parseInt(form.num_diagnoses) || 0,
      num_procedures: parseInt(form.num_procedures) || 0,
      prior_inpatient: parseInt(form.prior_inpatient) || 0,
      prior_emergency: parseInt(form.prior_emergency) || 0,
      length_of_stay: parseInt(form.length_of_stay) || 0,
      insulin: parseInt(form.insulin) || 0,
      discharge_type: parseInt(form.discharge_type) || 0,
    };

    onSubmit(patientData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
    >
      <h2 className="text-base font-semibold text-slate-800 mb-1">
        Patient Discharge Information
      </h2>
      <p className="text-xs text-slate-400 mb-6">
        Enter patient details to generate a risk assessment
      </p>

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Demographics & History
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DataEntry
          label="Age"
          name="age"
          value={form.age}
          onChange={handleChange}
          hint="years"
        />
        <DataEntry
          label="Length of Stay"
          name="length_of_stay"
          value={form.length_of_stay}
          onChange={handleChange}
          hint="days"
        />
        <DataEntry
          label="Prior Inpatient Visits"
          name="prior_inpatient"
          value={form.prior_inpatient}
          onChange={handleChange}
          hint="past 12 months"
        />
        <DataEntry
          label="Prior Emergency Visits"
          name="prior_emergency"
          value={form.prior_emergency}
          onChange={handleChange}
          hint="past 12 months"
        />
      </div>

      <div className="border-t border-slate-100 mb-6" />

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Clinical Complexity
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <DataEntry
          label="Active Diagnoses"
          name="num_diagnoses"
          value={form.num_diagnoses}
          onChange={handleChange}
        />
        <DataEntry
          label="Medications"
          name="num_medications"
          value={form.num_medications}
          onChange={handleChange}
        />
        <DataEntry
          label="Procedures"
          name="num_procedures"
          value={form.num_procedures}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-600">
            Insulin Prescribed
          </label>
          <select
            name="insulin"
            value={form.insulin}
            onChange={handleChange}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
      </div>

      <div className="border-t border-slate-100 mb-6" />

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
        Discharge Disposition
      </p>
      <div className="flex flex-col gap-1 mb-6">
        <label className="text-xs font-medium text-slate-600">
          Discharge Destination
        </label>
        <select
          name="discharge_type"
          value={form.discharge_type}
          onChange={handleChange}
          className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="0">Home</option>
          <option value="1">Rehab / Skilled Nursing Facility</option>
          <option value="2">Against Medical Advice</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-xl text-sm transition"
      >
        {loading ? "Analyzing..." : "Generate Risk Assessment"}
      </button>
    </form>
  );
}
