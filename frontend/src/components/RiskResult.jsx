import React from "react";

const riskConfig = {
  Low: {
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
  },
  Moderate: {
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    bar: "bg-amber-400",
    dot: "bg-amber-400",
  },
  High: {
    color: "text-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
    bar: "bg-red-500",
    dot: "bg-red-500",
  },
};

const recommendations = {
  Low: "Routine discharge. Schedule follow-up within 7–14 days. Review medication plan with patient.",
  Moderate:
    "Consider follow-up within 72 hours. Review medication adherence and confirm outpatient care is in place.",
  High: "Recommend care transition intervention. Same-day follow-up call and consider hospital-at-home program.",
};

export default function RiskResult({ result }) {
  const config = riskConfig[result.risk_level];
  const barWidth = `${result.risk_score * 100}%`;

  return (
    <div
      className={`rounded-2xl border ${config.border} ${config.bg} p-6 shadow-sm`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">
            30-Day Readmission Risk
          </p>
          <p className={`text-5xl font-bold ${config.color}`}>
            {result.percentage}
          </p>
        </div>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${config.border} bg-white`}
        >
          <div className={`w-2 h-2 rounded-full ${config.dot}`} />
          <span className={`text-xs font-semibold ${config.color}`}>
            {result.risk_level} Risk
          </span>
        </div>
      </div>

      {/* Risk bar */}
      <div className="mb-6">
        <div className="w-full bg-white rounded-full h-2 border border-slate-100">
          <div
            className={`h-2 rounded-full transition-all duration-700 ${config.bar}`}
            style={{ width: barWidth }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-slate-400">0%</span>
          <span className="text-xs text-slate-400">50%</span>
          <span className="text-xs text-slate-400">100%</span>
        </div>
      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-xl border border-slate-100 p-4 mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Suggested Action
        </p>
        <p className="text-sm text-slate-700 leading-relaxed">
          {recommendations[result.risk_level]}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-slate-400 text-center leading-relaxed">
        Clinical decision support only. Does not replace physician judgment.
      </p>
    </div>
  );
}
