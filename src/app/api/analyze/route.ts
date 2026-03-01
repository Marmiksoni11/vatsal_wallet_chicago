// src/app/api/analyze/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { LOOP_ZIPS } from "@/lib/plans";
import { calcDiscountMultiplier, analyzeMobile, analyzeInternet, analyzeTransit, analyzeInsurance } from "@/lib/engine";
import type { Category } from "@/types";

const schema = z.object({
  zip: z.string().length(5),
  categories: z.array(z.enum(["mobile", "internet", "transit", "insurance"])),
  bills: z.object({
    mobile: z.object({
      provider: z.string().default(""),
      cost: z.number().min(0),
      data: z.string().default("unlimited"),
      lines: z.number().min(1).default(1),
      hotspot: z.boolean().default(false),
      intl: z.boolean().default(false),
    }).optional(),
    internet: z.object({
      provider: z.string().default(""),
      cost: z.number().min(0),
      speed: z.number().min(0).default(100),
      datacap: z.enum(["yes", "no"]).default("no"),
    }).optional(),
    transit: z.object({
      mode: z.string().default("cta-monthly"),
      cost: z.number().min(0),
      freq: z.number().min(0).default(10),
      commute: z.enum(["loop-only", "suburb-loop", "mixed"]).default("loop-only"),
    }).optional(),
    insurance: z.object({
      insType: z.enum(["renters", "auto", "health", ""]).default("renters"),
      cost: z.number().min(0),
      deductible: z.number().default(500),
      coverage: z.enum(["basic", "standard", "premium"]).default("standard"),
    }).optional(),
  }),
  discounts: z.array(z.enum(["veteran","disability","senior","frontline","lowincome","child"])).default([]),
  childCount: z.number().default(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request data", details: parsed.error.flatten() }, { status: 400 });
    }

    const { zip, categories, bills, discounts, childCount } = parsed.data;

    if (!LOOP_ZIPS.has(zip)) {
      return NextResponse.json(
        { error: `ZIP ${zip} is outside the Chicago Loop. WindyWallet is Loop-exclusive.` },
        { status: 400 }
      );
    }

    const discMult = calcDiscountMultiplier(discounts, childCount);
    const results = [];

    if (categories.includes("mobile") && bills.mobile) {
      results.push(analyzeMobile(bills.mobile as any, discMult, discounts));
    }
    if (categories.includes("internet") && bills.internet) {
      results.push(analyzeInternet(bills.internet as any, discMult, discounts));
    }
    if (categories.includes("transit") && bills.transit) {
      results.push(analyzeTransit(bills.transit as any, discounts));
    }
    if (categories.includes("insurance") && bills.insurance) {
      results.push(analyzeInsurance(bills.insurance as any, discMult));
    }

    const totalMonthlySavings = Math.round(results.reduce((s, r) => s + r.saving, 0) * 100) / 100;
    const totalAnnualSavings  = Math.round(totalMonthlySavings * 12 * 100) / 100;

    return NextResponse.json({
      success: true,
      zip,
      discountMultiplier: Math.round(discMult * 100 * 10) / 10,
      totalMonthlySavings,
      totalAnnualSavings,
      results,
    });
  } catch (err) {
    console.error("Analyze error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
