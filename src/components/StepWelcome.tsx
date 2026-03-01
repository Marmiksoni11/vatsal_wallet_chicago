// src/components/StepWelcome.tsx
"use client";
import { useState } from "react";
import { Card, CardLabel, Eyebrow, PageTitle, Grad, Field, Input, Notice, BtnRow, Btn, Grid2 } from "./ui";
import { isValidChicagoZip, getNeighborhood } from "@/lib/chicago-zips";
import type { FormState } from "@/types";

const LOOP_ZIP_LIST = ["60601","60602","60603","60604","60605","60606","60607","60611","60616","60661"];

interface Props {
  form: FormState;
  patch: <K extends keyof FormState>(key: K, val: FormState[K]) => void;
  onNext: () => void;
}

export default function StepWelcome({ form, patch, onNext }: Props) {
  const [err, setErr] = useState("");

  const zipStatus = form.zip.length === 5
    ? isValidChicagoZip(form.zip) ? "ok" : "bad"
    : null;
  
  const neighborhood = form.zip.length === 5 && zipStatus === "ok" ? getNeighborhood(form.zip) : null;

  const handleNext = () => {
    if (!isValidChicagoZip(form.zip)) {
      setErr("Please enter a valid Chicago ZIP code to continue.");
      return;
    }
    setErr("");
    onNext();
  };

  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <div className="hero-bg rounded-2xl p-12 mb-7 text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 text-[120px] opacity-[0.07] pointer-events-none select-none leading-none">🌬</div>
        <Eyebrow>Chicago-Wide Savings</Eyebrow>
        <PageTitle>
          Stop Overpaying<br />on <Grad>Your Bills</Grad>
        </PageTitle>
        <p className="text-base text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
          WindyWallet finds cheaper alternatives for your mobile, internet, transit, and insurance across all Chicago neighborhoods.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["📱 Mobile","📡 Internet","🚇 Transit","🛡 Insurance"].map(t => (
            <span key={t} className="bg-white/80 rounded-full px-4 py-1.5 text-xs font-semibold text-gray-600 shadow-sm">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-7">
        {[["$312","Avg. Monthly Savings"],["55+","Chicago ZIP Codes"],["4","Bill Categories"]].map(([v, l]) => (
          <div key={l} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight grad-text mb-1">{v}</div>
            <div className="text-xs text-gray-400 font-medium">{l}</div>
          </div>
        ))}
      </div>

      {/* ZIP + Address */}
      <Card>
        <CardLabel icon="📍">Verify Your Loop Location</CardLabel>
        <Grid2>
          <Field label="ZIP Code">
            <Input
              type="text" maxLength={5} placeholder="Enter Loop ZIP (e.g. 60601)"
              value={form.zip}
              onChange={e => { patch("zip", e.target.value); setErr(""); }}
            />
            {zipStatus === "ok" && (
              <span className="text-xs text-emerald-600 font-semibold mt-1">✓ Valid Chicago Loop ZIP — you're covered!</span>
            )}
            {zipStatus === "bad" && (
              <span className="text-xs text-red-500 font-semibold mt-1">✗ ZIP {form.zip} is outside the Chicago Loop.</span>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[10px] text-gray-300 font-medium self-center mr-1">Valid:</span>
              {LOOP_ZIP_LIST.map(z => (
                <span key={z} className="bg-gray-100 text-gray-400 rounded px-1.5 py-0.5 text-[11px] font-semibold font-mono">{z}</span>
              ))}
            </div>
          </Field>
          <Field label="Street Address" hint="Optional">
            <Input type="text" placeholder="e.g. 233 S Wacker Dr"
              value={form.address} onChange={e => patch("address", e.target.value)} />
          </Field>
        </Grid2>
      </Card>

      {/* Budget */}
      <Card>
        <CardLabel icon="💰">Monthly Budget Overview</CardLabel>
        <Grid2>
          {([["total","Total Monthly Budget","3500"],["utilities","Total Utility Bills","300"],["personal","Personal Expenses","800"],["other","Other Expenses","400"]] as const).map(([k, label, ph]) => (
            <Field key={k} label={label}>
              <Input dollar type="number" placeholder={ph} min="0"
                value={form.budget[k]}
                onChange={e => patch("budget", { ...form.budget, [k]: e.target.value })}
              />
            </Field>
          ))}
        </Grid2>
      </Card>

      {err && <Notice type="error" icon="⚠️">{err}</Notice>}

      <BtnRow center>
        <Btn variant="primary" onClick={handleNext}>Get Started →</Btn>
      </BtnRow>
    </div>
  );
}
