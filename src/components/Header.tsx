// src/components/Header.tsx
"use client";

const TOTAL = 5;

export default function Header({ step }: { step: number }) {
  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-gray-200/80 px-6 h-16 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 grad-bg rounded-xl flex items-center justify-center text-lg shadow-md">
          🌬
        </div>
        <div>
          <div className="font-display text-xl font-bold leading-none tracking-tight">
            Windy<span className="grad-text">Wallet</span>
          </div>
          <div className="text-[10px] text-gray-400 tracking-widest mt-0.5">
            SMARTER BILLS. STRONGER LOOP.
          </div>
        </div>
      </div>

      {/* Step dots */}
      <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-4 py-2">
        <span className="text-xs font-semibold text-gray-400 mr-1.5">Step</span>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              width: i === step ? 20 : 7,
              height: 7,
              background: i < step ? "#059669" : i === step ? "#2563EB" : "#E5E7EB",
            }}
          />
        ))}
      </div>
    </header>
  );
}
