// src/components/StepResults.tsx
"use client";
import { Eyebrow, PageTitle, Grad, Notice, BtnRow, Btn } from "./ui";
import type { AnalyzeResponse, ComparisonResult, FormState, DiscountType } from "@/types";

const EMOJI: Record<string, string> = { mobile: "📱", internet: "📡", transit: "🚇", insurance: "🛡️" };
const ICON_BG: Record<string, string> = {
  mobile: "bg-primary-light", internet: "bg-accent-light",
  transit: "bg-emerald-50", insurance: "bg-purple-50",
};
const DISC_LABELS: Record<DiscountType, string> = {
  veteran: "Veteran", disability: "Disability", senior: "Senior",
  frontline: "Frontline Worker", lowincome: "Income-Qualified", child: "Family",
};

function Spinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-5 animate-fade-up">
      <div className="w-11 h-11 rounded-full border-[3px] border-gray-200 border-t-primary animate-spin-slow" />
      <div className="text-base font-semibold text-gray-400">Analyzing your bills…</div>
      <div className="text-sm text-gray-300 text-center max-w-xs">
        Comparing against curated Loop-area alternatives and applying eligible discounts
      </div>
    </div>
  );
}

function CompCard({ r, delay }: { r: ComparisonResult; delay: number }) {
  return (
    <div
      className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden mb-4 animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2.5 text-sm font-bold text-gray-900">
          <div className={`w-8 h-8 ${ICON_BG[r.category]} rounded-lg flex items-center justify-center text-base`}>
            {EMOJI[r.category]}
          </div>
          {r.label}
        </div>
        {r.alreadyOptimal
          ? <span className="bg-primary-light text-primary rounded-full px-3.5 py-1 text-xs font-bold">Already Optimized ✓</span>
          : <span className="bg-emerald-50 text-emerald-700 rounded-full px-3.5 py-1 text-xs font-bold">Save ${r.saving.toFixed(2)}/mo</span>
        }
      </div>

      {/* Body */}
      {r.alreadyOptimal ? (
        <div className="px-6 py-5">
          <div className="bg-emerald-50 rounded-xl px-4 py-3.5 text-emerald-700 text-sm font-semibold flex items-center gap-2.5">
            <span>✅</span> {r.message}
          </div>
        </div>
      ) : (
        <div className="px-6 py-5 grid grid-cols-[1fr_36px_1fr] gap-3 items-start">
          {/* Current */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-300 mb-2.5">Current Plan</div>
            <div className="text-sm font-bold text-gray-900 mb-1">{r.currentProvider}</div>
            <div className="font-display text-2xl font-extrabold text-gray-400 tracking-tight mb-2.5">
              ${r.currentCost.toFixed(2)}<span className="text-xs font-medium text-gray-300">/mo</span>
            </div>
            {r.currentFeatures?.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-200 flex-shrink-0" />{f}
              </div>
            ))}
          </div>

          {/* Arrow */}
          <div className="flex items-center justify-center pt-8">
            <div className="w-7 h-7 rounded-full bg-primary-light text-primary flex items-center justify-center text-xs font-bold">→</div>
          </div>

          {/* Alternative */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2.5">Recommended</div>
            <div className="text-sm font-bold text-gray-900 mb-1">{r.altProvider}</div>
            <div className="font-display text-2xl font-extrabold text-emerald-600 tracking-tight mb-2.5">
              ${r.altCost!.toFixed(2)}<span className="text-xs font-medium text-gray-300">/mo</span>
            </div>
            {r.altFeatures?.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-400 font-medium mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />{f}
              </div>
            ))}
            {r.discountApplied && (
              <div className="inline-flex items-center gap-1 bg-accent-light text-accent rounded-full px-2.5 py-1 text-[11px] font-semibold mt-2">
                🏷 Discount applied
              </div>
            )}
          </div>
        </div>
      )}

      {/* Note */}
      {r.note && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-2">
          <span className="opacity-60">ℹ️</span>{r.note}
        </div>
      )}
    </div>
  );
}

interface Props {
  result: AnalyzeResponse | null;
  loading: boolean;
  error: string;
  form: FormState;
  onBack: () => void;
  onReset: () => void;
}

export default function StepResults({ result, loading, error, form, onBack, onReset }: Props) {
  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="animate-fade-up">
        <Notice type="error" icon="❌">{error}</Notice>
        <BtnRow><Btn variant="secondary" onClick={onBack}>← Go Back</Btn></BtnRow>
      </div>
    );
  }

  if (!result) return null;

  const { totalMonthlySavings, totalAnnualSavings, discountMultiplier, results } = result;
  const budgetTotal = parseFloat(form.budget.total || "0");
  const budgetPct   = budgetTotal > 0 ? ((totalMonthlySavings / budgetTotal) * 100).toFixed(1) : null;
  const optimized   = results.filter(r => !r.alreadyOptimal).length;
  const discLabels  = form.discounts.map(d => DISC_LABELS[d]).filter(Boolean);

  return (
    <div className="animate-fade-up">
      <Eyebrow>Step 4 of 4 — Your Report</Eyebrow>
      <PageTitle>Your savings <Grad>breakdown</Grad></PageTitle>

      {/* Hero */}
      <div className="grad-bg rounded-2xl p-10 text-white mb-7 relative overflow-hidden">
        <div className="absolute -top-14 -right-14 w-64 h-64 rounded-full bg-white/[0.07] pointer-events-none" />
        <div className="relative z-10">
          <div className="text-xs font-semibold uppercase tracking-widest opacity-70 mb-2">Estimated Monthly Savings</div>
          <div className="font-display text-7xl font-extrabold tracking-tight leading-none mb-2 animate-fade-up">
            ${totalMonthlySavings.toFixed(2)}
          </div>
          <div className="text-base opacity-70 mb-6">
            ${totalAnnualSavings.toFixed(0)} per year
            {budgetPct && ` · ${budgetPct}% of your monthly budget recovered`}
          </div>
          <div className="flex flex-wrap gap-2">
            {results.filter(r => r.saving > 0).map(r => (
              <div key={r.category} className="bg-white/20 border border-white/25 backdrop-blur rounded-full px-4 py-1.5 text-xs font-semibold">
                {EMOJI[r.category]} {r.label}: save ${r.saving.toFixed(2)}/mo
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          ["$" + totalMonthlySavings.toFixed(2), "Monthly Savings",  "text-primary"],
          ["$" + totalAnnualSavings.toFixed(0),  "Annual Savings",   "text-emerald-600"],
          [optimized + " / " + results.length,   "Plans Optimized",  "text-accent"],
        ].map(([v, l, cls]) => (
          <div key={l} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <div className={`font-display text-2xl font-extrabold tracking-tight mb-1 ${cls}`}>{v}</div>
            <div className="text-xs text-gray-400 font-medium">{l}</div>
          </div>
        ))}
      </div>

      {/* Discount notice */}
      {discountMultiplier > 0 && discLabels.length > 0 && (
        <Notice type="info" icon="🏷️">
          Discount eligibility ({discLabels.join(", ")}) applied — an extra {discountMultiplier}% reduction on eligible plans.
        </Notice>
      )}

      {/* Comparison cards */}
      {results.map((r, i) => <CompCard key={r.category} r={r} delay={i * 100} />)}

      <BtnRow>
        <Btn variant="secondary" onClick={onBack}>← Adjust Bills</Btn>
        <Btn variant="primary" onClick={onReset}>🌬 New Analysis</Btn>
      </BtnRow>
    </div>
  );
}
