// src/lib/plans.ts
// All internal curated datasets — real 2024 Chicago Loop market pricing

export const LOOP_ZIPS = new Set([
  "60601","60602","60603","60604","60605",
  "60606","60607","60611","60616","60661",
]);

// ── Mobile ───────────────────────────────────────────────────
export interface MobilePlan {
  provider: string;
  cost: number;
  data: string;
  hotspot: boolean;
  intl: boolean;
  linesMax: number;
  note: string;
}

export const MOBILE_PLANS: MobilePlan[] = [
  { provider: "Visible by Verizon",    cost: 25,  data: "unlimited", hotspot: true,  intl: false, linesMax: 1, note: "Verizon network. Unlimited hotspot at reduced speeds. No contracts ever." },
  { provider: "Mint Mobile",           cost: 30,  data: "unlimited", hotspot: true,  intl: false, linesMax: 1, note: "T-Mobile network. Best single-line value in Chicago. 3-month prepay rate." },
  { provider: "Tello Mobile",          cost: 14,  data: "5",         hotspot: true,  intl: false, linesMax: 1, note: "T-Mobile network. Perfect for light users. Zero hidden fees." },
  { provider: "Consumer Cellular",     cost: 20,  data: "5",         hotspot: false, intl: false, linesMax: 1, note: "AT&T/T-Mobile network. Best for seniors. AARP discount available." },
  { provider: "Google Fi Unlimited",   cost: 65,  data: "unlimited", hotspot: true,  intl: true,  linesMax: 1, note: "International calling to 50+ countries. Uses T-Mobile + US Cellular." },
  { provider: "Metro by T-Mobile",     cost: 40,  data: "unlimited", hotspot: true,  intl: false, linesMax: 1, note: "T-Mobile 5G. Strong Chicago Loop downtown coverage. No annual contract." },
  { provider: "Cricket Wireless (1L)", cost: 55,  data: "unlimited", hotspot: true,  intl: false, linesMax: 1, note: "AT&T network. Reliable Loop coverage. AutoPay discount applied." },
  { provider: "Cricket Wireless (2L)", cost: 80,  data: "unlimited", hotspot: true,  intl: false, linesMax: 2, note: "Best 2-line unlimited on AT&T. $40/line with AutoPay." },
  { provider: "T-Mobile Essentials",   cost: 60,  data: "unlimited", hotspot: true,  intl: true,  linesMax: 1, note: "Excellent 5G Loop coverage. International texting to 200+ countries." },
];

// ── Internet ─────────────────────────────────────────────────
export interface InternetPlan {
  provider: string;
  cost: number;
  speed: number;
  datacap: boolean;
  eligibility: "lowincome" | null;
  note: string;
}

export const INTERNET_PLANS: InternetPlan[] = [
  { provider: "Comcast Internet Essentials", cost: 9.95, speed: 50,   datacap: false, eligibility: "lowincome", note: "Income-qualified only. Free modem included. Widely available in Loop buildings." },
  { provider: "AT&T Access",                 cost: 10,   speed: 25,   datacap: false, eligibility: "lowincome", note: "Income-qualified program. No annual contract. Basic equipment included." },
  { provider: "RCN Chicago – 200 Mbps",      cost: 40,   speed: 200,  datacap: false, eligibility: null,        note: "No annual contract. Strong Loop availability. AutoPay pricing." },
  { provider: "T-Mobile Home Internet",      cost: 50,   speed: 182,  datacap: false, eligibility: null,        note: "No contracts, no data caps. 5G gateway included. Available most Loop ZIPs." },
  { provider: "Starry Internet",             cost: 50,   speed: 200,  datacap: false, eligibility: null,        note: "Fixed wireless. Available in select Loop high-rise buildings." },
  { provider: "Xfinity Performance Select",  cost: 55,   speed: 300,  datacap: false, eligibility: null,        note: "AutoPay discount applied. No term contract option." },
  { provider: "RCN Chicago – 1 Gig",         cost: 55,   speed: 1000, datacap: false, eligibility: null,        note: "Gigabit at competitive Chicago pricing. No data caps ever." },
  { provider: "Xfinity Gigabit",             cost: 80,   speed: 1200, datacap: false, eligibility: null,        note: "Best for heavy users / remote workers. xFi gateway year 1." },
];

// ── Transit labels ────────────────────────────────────────────
export const TRANSIT_LABELS: Record<string, string> = {
  "cta-monthly":     "CTA 30-Day Unlimited Pass (Ventra)",
  "cta-reduced":     "CTA Reduced Fare 30-Day Pass",
  "cta-perride":     "CTA Pay-Per-Ride (Ventra)",
  "metra-monthly-a": "Metra Monthly Pass – Zone A",
  "metra-monthly-b": "Metra Monthly Pass – Zone B",
  "metra-monthly-c": "Metra Monthly Pass – Zone C",
  "metra-10ride":    "Metra 10-Ride Ticket",
  "rideshare":       "Rideshare (Uber / Lyft)",
  "car":             "Personal Car",
  "divvy":           "Divvy Bike Share",
};

// ── Insurance ─────────────────────────────────────────────────
export interface InsurancePlan {
  provider: string;
  monthly: number;
  deductible: number;
  coverage: "basic" | "standard" | "premium";
  note: string;
}

export const INSURANCE_PLANS: Record<string, InsurancePlan[]> = {
  renters: [
    { provider: "Lemonade Renters",      monthly: 9,   deductible: 500,  coverage: "standard", note: "AI-powered instant claims. Most popular for Loop renters. Starts at $5/mo." },
    { provider: "Hippo Renters",         monthly: 10,  deductible: 500,  coverage: "standard", note: "Smart home coverage. Competitive for Loop high-rises." },
    { provider: "Allstate ProtectEase",  monthly: 12,  deductible: 500,  coverage: "standard", note: "Bundle with auto for extra 5–10% off." },
    { provider: "State Farm Renters",    monthly: 14,  deductible: 1000, coverage: "standard", note: "Largest IL insurer. Security system discounts available." },
  ],
  auto: [
    { provider: "Root Insurance",        monthly: 83,  deductible: 1000, coverage: "standard", note: "Usage-based. Low-mileage Loop drivers save 20–40%." },
    { provider: "Clearcover (Illinois)", monthly: 92,  deductible: 500,  coverage: "standard", note: "Digital-first. Competitive Chicago ZIP rates. Fast claims." },
    { provider: "Progressive Chicago",   monthly: 99,  deductible: 1000, coverage: "standard", note: "Snapshot program rewards safe driving." },
    { provider: "GEICO Illinois",        monthly: 105, deductible: 1000, coverage: "standard", note: "Multi-policy and good-driver discounts available." },
  ],
  health: [
    { provider: "Ambetter – Silver IL",       monthly: 260, deductible: 5000, coverage: "standard", note: "ACA Silver. Cook County. Telehealth included." },
    { provider: "Oscar Health – Silver IL",   monthly: 285, deductible: 4500, coverage: "standard", note: "In-network at Northwestern Memorial Loop. $0 virtual care." },
    { provider: "Molina Healthcare IL",       monthly: 218, deductible: 9200, coverage: "basic",    note: "ACA Bronze. Lowest premium. Best for healthy, minimal-use individuals." },
    { provider: "Blue Cross Blue Shield IL",  monthly: 352, deductible: 2500, coverage: "premium",  note: "Gold-tier. Widest Loop hospital network — Rush, NMH, UI Health." },
  ],
};
