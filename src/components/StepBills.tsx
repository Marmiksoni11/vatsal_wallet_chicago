// src/components/StepBills.tsx
"use client";
import { useState } from "react";
import { Card, CardLabel, Eyebrow, PageTitle, Grad, Subtitle, Grid2, Field, Input, Select, Toggle, Notice, BtnRow, Btn } from "./ui";
import type { FormState } from "@/types";

interface Props {
  form: FormState;
  patchBill: <C extends keyof FormState["bills"]>(cat: C, field: keyof FormState["bills"][C], val: unknown) => void;
  onBack: () => void;
  onNext: () => void;
}

export default function StepBills({ form, patchBill, onBack, onNext }: Props) {
  const [err, setErr] = useState("");
  const cats = form.categories;
  const b = form.bills;

  const setM = (f: keyof typeof b.mobile)    => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => patchBill("mobile",    f, e.target.type === "number" ? Number(e.target.value) : e.target.value);
  const setI = (f: keyof typeof b.internet)  => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => patchBill("internet",  f, e.target.type === "number" ? Number(e.target.value) : e.target.value);
  const setT = (f: keyof typeof b.transit)   => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => patchBill("transit",   f, e.target.type === "number" ? Number(e.target.value) : e.target.value);
  const setN = (f: keyof typeof b.insurance) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => patchBill("insurance", f, e.target.type === "number" ? Number(e.target.value) : e.target.value);

  const handleNext = () => {
    const missing = cats.filter(c => !b[c]?.cost);
    if (missing.length) { setErr(`Please fill in the monthly cost for: ${missing.join(", ")}`); return; }
    setErr(""); onNext();
  };

  return (
    <div className="animate-fade-up">
      <Eyebrow>Step 2 of 4</Eyebrow>
      <PageTitle>Your current <Grad>bill details</Grad></PageTitle>
      <Subtitle>Enter what you're paying now. Be as accurate as possible for the best recommendations.</Subtitle>

      {/* ── MOBILE ─────────────────────────────────────────── */}
      {cats.includes("mobile") && (
        <Card>
          <CardLabel icon="📱">Mobile / Telephone</CardLabel>
          <Grid2>
            <Field label="Current Provider">
              <Select value={b.mobile.provider} onChange={setM("provider")}>
                <option value="">Select carrier</option>
                {["AT&T","Verizon","T-Mobile","Sprint (T-Mobile)","US Cellular","Boost Mobile","Cricket Wireless","Metro by T-Mobile","Other"].map(p => <option key={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Monthly Bill">
              <Input dollar type="number" placeholder="85" min="0" value={b.mobile.cost || ""} onChange={setM("cost")} />
            </Field>
            <Field label="Data Allowance">
              <Select value={b.mobile.data} onChange={setM("data")}>
                <option value="unlimited">Unlimited</option>
                {["50","30","15","10","5","3","1"].map(g => <option key={g} value={g}>{g} GB/month</option>)}
              </Select>
            </Field>
            <Field label="Number of Lines" hint="Total lines on account">
              <Input type="number" placeholder="1" min="1" max="10" value={b.mobile.lines || ""} onChange={setM("lines")} />
            </Field>
          </Grid2>
          <div className="mt-4">
            <Toggle checked={b.mobile.hotspot} onChange={v => patchBill("mobile","hotspot",v)} label="Mobile Hotspot / Tethering" sub="Your plan includes hotspot data" />
            <Toggle checked={b.mobile.intl}    onChange={v => patchBill("mobile","intl",v)}    label="International Calling / Roaming" sub="You use international features regularly" />
          </div>
        </Card>
      )}

      {/* ── INTERNET ───────────────────────────────────────── */}
      {cats.includes("internet") && (
        <Card>
          <CardLabel icon="📡">WiFi / Internet</CardLabel>
          <Grid2>
            <Field label="Current Provider">
              <Select value={b.internet.provider} onChange={setI("provider")}>
                <option value="">Select provider</option>
                {["Comcast Xfinity","AT&T Internet","RCN Chicago","WOW! Internet","Starry Internet","T-Mobile Home Internet","Other"].map(p => <option key={p}>{p}</option>)}
              </Select>
            </Field>
            <Field label="Monthly Bill">
              <Input dollar type="number" placeholder="75" min="0" value={b.internet.cost || ""} onChange={setI("cost")} />
            </Field>
            <Field label="Download Speed">
              <Select value={b.internet.speed || ""} onChange={setI("speed")}>
                <option value="">Select speed tier</option>
                {[["1200","1.2 Gbps (Gigabit+)"],["1000","1 Gbps"],["500","500 Mbps"],["300","300 Mbps"],["200","200 Mbps"],["100","100 Mbps"],["50","50 Mbps"],["25","25 Mbps"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </Select>
            </Field>
            <Field label="Data Cap">
              <Select value={b.internet.datacap} onChange={setI("datacap")}>
                <option value="no">No data cap (unlimited)</option>
                <option value="yes">Has monthly data cap</option>
              </Select>
            </Field>
          </Grid2>
        </Card>
      )}

      {/* ── TRANSIT ────────────────────────────────────────── */}
      {cats.includes("transit") && (
        <Card>
          <CardLabel icon="🚇">Transit</CardLabel>
          <Grid2>
            <Field label="Current Transit Method">
              <Select value={b.transit.mode} onChange={setT("mode")}>
                <option value="">Select primary method</option>
                <option value="cta-monthly">CTA 30-Day Unlimited (Ventra)</option>
                <option value="cta-reduced">CTA Reduced Fare 30-Day</option>
                <option value="cta-perride">CTA Pay-Per-Ride (Ventra)</option>
                <option value="metra-monthly-a">Metra Monthly – Zone A</option>
                <option value="metra-monthly-b">Metra Monthly – Zone B</option>
                <option value="metra-monthly-c">Metra Monthly – Zone C</option>
                <option value="metra-10ride">Metra 10-Ride Ticket</option>
                <option value="rideshare">Rideshare (Uber / Lyft)</option>
                <option value="car">Personal Car</option>
                <option value="divvy">Divvy Bike Share</option>
              </Select>
            </Field>
            <Field label="Monthly Spend" hint="All transit costs combined">
              <Input dollar type="number" placeholder="105" min="0" value={b.transit.cost || ""} onChange={setT("cost")} />
            </Field>
            <Field label="Trips per Week" hint="Round trips count as 2">
              <Input type="number" placeholder="10" min="0" max="100" value={b.transit.freq || ""} onChange={setT("freq")} />
            </Field>
            <Field label="Commute Type">
              <Select value={b.transit.commute} onChange={setT("commute")}>
                <option value="loop-only">Within Loop only</option>
                <option value="suburb-loop">Suburb → Loop (daily)</option>
                <option value="mixed">Mixed — Loop + neighborhood</option>
              </Select>
            </Field>
          </Grid2>
        </Card>
      )}

      {/* ── INSURANCE ──────────────────────────────────────── */}
      {cats.includes("insurance") && (
        <Card>
          <CardLabel icon="🛡️">Insurance</CardLabel>
          <Grid2>
            <Field label="Type of Insurance">
              <Select value={b.insurance.insType} onChange={setN("insType")}>
                <option value="">Select type</option>
                <option value="renters">Renters Insurance</option>
                <option value="auto">Auto Insurance</option>
                <option value="health">Health Insurance (individual)</option>
              </Select>
            </Field>
            <Field label="Monthly Premium">
              <Input dollar type="number" placeholder="120" min="0" value={b.insurance.cost || ""} onChange={setN("cost")} />
            </Field>
            <Field label="Deductible">
              <Select value={b.insurance.deductible} onChange={setN("deductible")}>
                {[["0","$0"],["500","$500"],["1000","$1,000"],["1500","$1,500"],["2500","$2,500"],["5000","$5,000"]].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
              </Select>
            </Field>
            <Field label="Coverage Level">
              <Select value={b.insurance.coverage} onChange={setN("coverage")}>
                <option value="basic">Basic — minimum required</option>
                <option value="standard">Standard — balanced</option>
                <option value="premium">Premium — comprehensive</option>
              </Select>
            </Field>
          </Grid2>
          {b.insurance.insType === "auto"   && <Notice type="info" icon="💡" className="mt-4">Auto rates vary by driving history & vehicle. Estimates use Loop-area averages.</Notice>}
          {b.insurance.insType === "health" && <Notice type="info" icon="💡" className="mt-4">Health plans are ACA Cook County marketplace estimates. Actual premiums vary by age & income.</Notice>}
        </Card>
      )}

      {err && <Notice type="error" icon="⚠️">{err}</Notice>}

      <BtnRow>
        <Btn variant="secondary" onClick={onBack}>← Back</Btn>
        <Btn variant="primary" onClick={handleNext}>Continue →</Btn>
      </BtnRow>
    </div>
  );
}
