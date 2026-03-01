// src/components/ui.tsx
"use client";
import { type ReactNode, type InputHTMLAttributes, type SelectHTMLAttributes } from "react";

/* ── Card ─────────────────────────────────────────── */
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-200 p-7 mb-5 border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}

/* ── CardLabel ────────────────────────────────────── */
export function CardLabel({ icon, children }: { icon?: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-5">
      {icon && (
        <span className="w-7 h-7 bg-primary-light rounded-lg flex items-center justify-center text-sm">
          {icon}
        </span>
      )}
      {children}
    </div>
  );
}

/* ── Eyebrow ──────────────────────────────────────── */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-primary-light text-primary rounded-full px-3 py-1 text-xs font-semibold mb-4">
      {children}
    </div>
  );
}

/* ── PageTitle ────────────────────────────────────── */
export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="font-display text-4xl font-extrabold tracking-tight leading-tight mb-3 text-gray-900">
      {children}
    </h1>
  );
}

export function Grad({ children }: { children: ReactNode }) {
  return <span className="grad-text">{children}</span>;
}

/* ── Subtitle ─────────────────────────────────────── */
export function Subtitle({ children }: { children: ReactNode }) {
  return <p className="text-base text-gray-500 leading-relaxed mb-9 max-w-lg">{children}</p>;
}

/* ── Grid ─────────────────────────────────────────── */
export function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
}

/* ── Field ────────────────────────────────────────── */
export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      {hint && <span className="text-xs text-gray-400 -mt-1">{hint}</span>}
      {children}
    </div>
  );
}

/* ── Input ────────────────────────────────────────── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  dollar?: boolean;
}
export function Input({ dollar, className = "", ...props }: InputProps) {
  return (
    <div className="relative">
      {dollar && (
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400 pointer-events-none z-10">
          $
        </span>
      )}
      <input
        className={`w-full h-11 bg-gray-50 border border-transparent rounded-xl px-3.5 text-sm font-medium text-gray-900
          focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10
          transition-all duration-200 ${dollar ? "pl-7" : ""} ${className}`}
        {...props}
      />
    </div>
  );
}

/* ── Select ───────────────────────────────────────── */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}
export function Select({ children, className = "", ...props }: SelectProps) {
  return (
    <select
      className={`w-full h-11 bg-gray-50 border border-transparent rounded-xl px-3.5 pr-10 text-sm font-medium text-gray-900
        appearance-none cursor-pointer
        focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10
        transition-all duration-200 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236B7280' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 14px center",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

/* ── Toggle ───────────────────────────────────────── */
export function Toggle({ checked, onChange, label, sub }: {
  checked: boolean; onChange: (v: boolean) => void; label: string; sub?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <div>
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className="relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-250 focus:outline-none"
        style={{ background: checked ? "#2563EB" : "#E5E7EB" }}
      >
        <span
          className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all duration-250"
          style={{ left: checked ? "calc(100% - 22px)" : 2 }}
        />
      </button>
    </div>
  );
}

/* ── CheckCard ────────────────────────────────────── */
export function CheckCard({ checked, onClick, emoji, label, sub }: {
  checked: boolean; onClick: () => void; emoji: string; label: string; sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 text-left p-4 rounded-xl border transition-all duration-200
        ${checked ? "bg-primary-light border-primary" : "bg-gray-50 border-transparent hover:bg-primary-light/50"}`}
    >
      <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-[11px] font-bold transition-all
        ${checked ? "bg-primary border-primary text-white" : "border-2 border-gray-300 bg-transparent text-transparent"}`}>
        ✓
      </div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{emoji} {label}</div>
        {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
      </div>
    </button>
  );
}

/* ── Notice ───────────────────────────────────────── */
const noticeStyles = {
  info:    "bg-primary-light text-primary",
  error:   "bg-red-50 text-red-600",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
};
export function Notice({ type = "info", icon, children }: {
  type?: "info"|"error"|"success"|"warning"; icon?: string; children: ReactNode;
}) {
  return (
    <div className={`flex items-start gap-2.5 px-4 py-3.5 rounded-xl text-sm font-medium mb-4 ${noticeStyles[type]}`}>
      {icon && <span className="text-base flex-shrink-0 mt-0.5">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

/* ── Btn ──────────────────────────────────────────── */
const btnStyles = {
  primary:   "grad-bg text-white shadow-btn hover:opacity-90 hover:-translate-y-0.5",
  secondary: "bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-700",
  accent:    "bg-accent text-white shadow-btn-accent hover:opacity-90 hover:-translate-y-0.5",
};
export function Btn({ variant = "primary", children, className = "", ...props }: {
  variant?: "primary"|"secondary"|"accent"; children: ReactNode; className?: string;
  [k: string]: any;
}) {
  return (
    <button
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm
        transition-all duration-200 active:translate-y-0 focus:outline-none
        ${btnStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

/* ── BtnRow ───────────────────────────────────────── */
export function BtnRow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 mt-8 ${center ? "justify-center" : "justify-end"}`}>
      {children}
    </div>
  );
}
