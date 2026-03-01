// src/components/StepDiscounts.tsx
"use client";
import { useState } from "react";
import { Card, CardLabel, Eyebrow, PageTitle, Grad, Subtitle, Field, Input, CheckCard, Notice, BtnRow, Btn } from "./ui";
import type { FormState, DiscountType } from "@/types";

const OPTS: { id: DiscountType; emoji: string; label: string; sub: string }[] = [
  { id: "veteran",   emoji: "🎖",  label: "Veteran",          sub: "Active duty or honorably discharged" },
  { id: "disability",emoji: "♿",  label: "Disability",        sub: "ADA-recognized disability status" },
  { id: "senior",    emoji: "🧓",  label: "Senior (65+)",      sub: "Age 65 or older" },
  { id: "frontline", emoji: "🏥",  label: "Frontline Worker",  sub: "Healthcare, fire, police, CTA/transit" },
  { id: "child",     emoji: "👶",  label: "Child Under 12",    sub: "Family plan or benefit eligibility" },
  { id: "lowincome", emoji: "🏠",  label: "Income-Qualified",  sub: "Enrolled in SNAP, Medicaid, or similar" },
];

interface Props {
  form: FormState;
  patch: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  onBack: () => void;
  onSubmit: () => void;
}

export default function StepDiscounts({ form, patch, onBack, onSubmit }: Props) {
  const [err, setErr] = useState("");

  const toggle = (id: DiscountType) => {
    const next = form.discounts.includes(id)
      ? form.discounts.filter(d => d !== id)
      : [...form.discounts, id];
    patch("discounts", next);
  };

  const handleSubmit = () => {
    if (!form.attested) { setErr("Please complete the self-attestation to continue."); return; }
    setErr(""); onSubmit();
  };

  return (
    <div className="animate-fade-up">
      <Eyebrow>Step 3 of 4</Eyebrow>
      <PageTitle>Discount <Grad>eligibility</Grad></PageTitle>
      <Subtitle>You may qualify for additional discounts. Select all that apply, or skip and continue.</Subtitle>

      <Card>
        <CardLabel icon="🎫">Eligible Groups</CardLabel>
        <div className="grid grid-cols-2 gap-2.5">
          {OPTS.map(o => (
            <CheckCard
              key={o.id}
              checked={form.discounts.includes(o.id)}
              onClick={() => toggle(o.id)}
              emoji={o.emoji} label={o.label} sub={o.sub}
            />
          ))}
        </div>
        {form.discounts.includes("child") && (
          <div className="mt-5 pt-5 border-t border-gray-100">
            <Field label="Number of Children Under 12">
              <Input type="number" min="1" max="10"
                value={form.childCount}
                onChange={e => patch("childCount", Number(e.target.value))}
                className="max-w-[130px]"
              />
            </Field>
          </div>
        )}
      </Card>

      <Card>
        <CardLabel icon="✅">Self-Attestation</CardLabel>
        <button
          onClick={() => patch("attested", !form.attested)}
          className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all duration-200
            ${form.attested ? "bg-accent-light border-accent" : "bg-accent-light/50 border-purple-200/60 hover:border-accent/60"}`}
        >
          <div className={`w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center text-[11px] font-bold transition-all
            ${form.attested ? "bg-accent border-accent text-white" : "border-2 border-purple-300 text-transparent"}`}>
            ✓
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            <strong className="text-gray-800">I confirm the information I've provided is accurate to the best of my knowledge.</strong>{" "}
            I understand eligibility is self-attested and WindyWallet may verify status at time of benefit activation.
            I agree to the WindyWallet Terms of Service and Privacy Policy.
          </p>
        </button>
      </Card>

      {err && <Notice type="error" icon="⚠️">{err}</Notice>}

      <BtnRow>
        <Btn variant="secondary" onClick={onBack}>← Back</Btn>
        <Btn variant="accent" onClick={handleSubmit}>🔍 Analyze My Bills →</Btn>
      </BtnRow>
    </div>
  );
}
