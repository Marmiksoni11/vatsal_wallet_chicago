"use client";

import { useState } from "react";
import Header from "@/components/Header";
import StepWelcome from "@/components/StepWelcome";
import StepCategories from "@/components/StepCategories";
import StepBills from "@/components/StepBills";
import StepDiscounts from "@/components/StepDiscounts";
import StepResults from "@/components/StepResults";
import type { FormState, AnalyzeResponse } from "@/types";

const INITIAL: FormState = {
  zip: "", address: "",
  budget: { total: "", utilities: "", personal: "", other: "" },
  categories: [],
  bills: {
    mobile:    { provider: "", cost: 0, data: "unlimited", lines: 1, hotspot: false, intl: false },
    internet:  { provider: "", cost: 0, speed: 200, datacap: "no" },
    transit:   { mode: "", cost: 0, freq: 10, commute: "loop-only" },
    insurance: { insType: "", cost: 0, deductible: 500, coverage: "standard" },
  },
  discounts: [], childCount: 1, attested: false,
};

export default function Page() {
  const [step, setStep]       = useState(0);
  const [form, setForm]       = useState<FormState>(INITIAL);
  const [result, setResult]   = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiErr, setApiErr]   = useState("");

  const goTo = (n: number) => { setStep(n); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const patch = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const patchBill = <C extends keyof FormState["bills"]>(
    cat: C, field: keyof FormState["bills"][C], val: unknown
  ) =>
    setForm(prev => ({
      ...prev,
      bills: { ...prev.bills, [cat]: { ...prev.bills[cat], [field]: val } },
    }));

  const handleAnalyze = async () => {
    setLoading(true); setApiErr(""); goTo(4);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zip: form.zip,
          categories: form.categories,
          bills: form.bills,
          discounts: form.discounts,
          childCount: form.childCount,
        }),
      });
      const data: AnalyzeResponse = await res.json();
      if (!res.ok) throw new Error((data as any).error ?? "Analysis failed");
      setResult(data);
      // Save to DB (non-blocking)
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zip: form.zip,
          categories: form.categories,
          discounts: form.discounts,
          totalSavings: data.totalMonthlySavings,
          annualSavings: data.totalAnnualSavings,
          optimizedCount: data.results.filter(r => !r.alreadyOptimal).length,
        }),
      }).catch(() => {});
    } catch (e: any) {
      setApiErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setForm(INITIAL); setResult(null); setApiErr(""); goTo(0); };

  const steps = [
    <StepWelcome   key={0} form={form} patch={patch} onNext={() => goTo(1)} />,
    <StepCategories key={1} form={form} patch={patch} onBack={() => goTo(0)} onNext={() => goTo(2)} />,
    <StepBills      key={2} form={form} patchBill={patchBill} onBack={() => goTo(1)} onNext={() => goTo(3)} />,
    <StepDiscounts  key={3} form={form} patch={patch} onBack={() => goTo(2)} onSubmit={handleAnalyze} />,
    <StepResults    key={4} result={result} loading={loading} error={apiErr} form={form} onBack={() => goTo(2)} onReset={reset} />,
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header step={step} />
      <main className="max-w-3xl mx-auto px-5 py-12 pb-24">
        {steps[step]}
      </main>
    </div>
  );
}
