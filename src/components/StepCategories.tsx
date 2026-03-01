// src/components/StepCategories.tsx
"use client";
import { useState } from "react";
import { Eyebrow, PageTitle, Grad, Subtitle, Notice, BtnRow, Btn } from "./ui";
import type { FormState, Category } from "@/types";

const CATS: { id: Category; emoji: string; name: string; desc: string }[] = [
  { id: "mobile",    emoji: "📱", name: "Mobile / Telephone", desc: "Phone plans, data, hotspot & international add-ons" },
  { id: "internet",  emoji: "📡", name: "WiFi / Internet",    desc: "Home broadband, fiber, cable & fixed wireless" },
  { id: "transit",   emoji: "🚇", name: "Transit",            desc: "CTA Ventra, Metra passes & commuter options" },
  { id: "insurance", emoji: "🛡️", name: "Insurance",          desc: "Renters, auto & health insurance plans" },
];

interface Props {
  form: FormState;
  patch: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepCategories({ form, patch, onBack, onNext }: Props) {
  const [err, setErr] = useState(false);

  const toggle = (id: Category) => {
    const next = form.categories.includes(id)
      ? form.categories.filter(c => c !== id)
      : [...form.categories, id];
    patch("categories", next);
    if (next.length) setErr(false);
  };

  const handleNext = () => {
    if (!form.categories.length) { setErr(true); return; }
    onNext();
  };

  return (
    <div className="animate-fade-up">
      <Eyebrow>Step 1 of 4</Eyebrow>
      <PageTitle>What should we <Grad>optimize?</Grad></PageTitle>
      <Subtitle>Choose the bill categories you'd like WindyWallet to analyze. You can select multiple.</Subtitle>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {CATS.map(c => {
          const on = form.categories.includes(c.id);
          return (
            <button
              key={c.id}
              onClick={() => toggle(c.id)}
              className={`relative text-left p-6 rounded-2xl border-2 transition-all duration-200 cursor-pointer
                ${on ? "bg-primary-light border-primary shadow-sm" : "bg-gray-50 border-transparent hover:bg-blue-50/50 hover:border-primary/30"}`}
            >
              {on && (
                <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-white text-[11px] font-bold">✓</div>
              )}
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3 bg-white
                ${on ? "shadow-md" : "shadow-sm"} transition-shadow duration-200`}>
                {c.emoji}
              </div>
              <div className="text-sm font-bold text-gray-900 mb-1">{c.name}</div>
              <div className="text-xs text-gray-400 leading-snug">{c.desc}</div>
            </button>
          );
        })}
      </div>

      {err && <Notice type="warning" icon="⚠️">Please select at least one category to continue.</Notice>}

      <BtnRow>
        <Btn variant="secondary" onClick={onBack}>← Back</Btn>
        <Btn variant="primary" onClick={handleNext}>Continue →</Btn>
      </BtnRow>
    </div>
  );
}
