import React from "react";

export default function DataEntry({ label, name, value, onChange, hint }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
        {label}
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        min={0}
        className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      {hint && <span className="text-xs text-slate-400 italic">{hint}</span>}
    </div>
  );
}
