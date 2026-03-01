// src/types/index.ts

export type Category = "mobile" | "internet" | "transit" | "insurance";

export type DiscountType =
  | "veteran"
  | "disability"
  | "senior"
  | "frontline"
  | "lowincome"
  | "child";

export type CoverageLevel = "basic" | "standard" | "premium";
export type DatacapOption = "yes" | "no";
export type CommuteType = "loop-only" | "suburb-loop" | "mixed";

// ── Bill input shapes ────────────────────────────────────────
export interface MobileBill {
  provider: string;
  cost: number;
  data: string; // "unlimited" | "50" | "30" etc.
  lines: number;
  hotspot: boolean;
  intl: boolean;
}

export interface InternetBill {
  provider: string;
  cost: number;
  speed: number;
  datacap: DatacapOption;
}

export interface TransitBill {
  mode: string;
  cost: number;
  freq: number;
  commute: CommuteType;
}

export interface InsuranceBill {
  insType: "renters" | "auto" | "health" | "";
  cost: number;
  deductible: number;
  coverage: CoverageLevel;
}

export interface Bills {
  mobile: MobileBill;
  internet: InternetBill;
  transit: TransitBill;
  insurance: InsuranceBill;
}

// ── Analysis request ─────────────────────────────────────────
export interface AnalyzeRequest {
  zip: string;
  categories: Category[];
  bills: Bills;
  discounts: DiscountType[];
  childCount: number;
}

// ── Analysis result ──────────────────────────────────────────
export interface ComparisonResult {
  category: Category;
  label: string;
  currentProvider: string;
  currentCost: number;
  currentFeatures?: string[];
  altProvider?: string;
  altCost?: number;
  altFeatures?: string[];
  saving: number;
  discountApplied: boolean;
  alreadyOptimal: boolean;
  message?: string;
  note?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  zip: string;
  discountMultiplier: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  results: ComparisonResult[];
}

// ── Form state ───────────────────────────────────────────────
export interface FormState {
  zip: string;
  address: string;
  budget: { total: string; utilities: string; personal: string; other: string };
  categories: Category[];
  bills: Bills;
  discounts: DiscountType[];
  childCount: number;
  attested: boolean;
}
