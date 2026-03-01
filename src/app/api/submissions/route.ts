// src/app/api/submissions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { zip, categories, discounts, totalSavings, annualSavings, optimizedCount } = await req.json();
    const doc = await prisma.submission.create({
      data: {
        zip,
        categories: JSON.stringify(categories ?? []),
        discounts:  JSON.stringify(discounts  ?? []),
        totalSavings:   totalSavings   ?? 0,
        annualSavings:  annualSavings  ?? 0,
        optimizedCount: optimizedCount ?? 0,
      },
    });
    return NextResponse.json({ success: true, id: doc.id }, { status: 201 });
  } catch (err) {
    // Non-critical — DB may not be initialised yet
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const rows = await prisma.submission.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: "Could not fetch submissions." }, { status: 500 });
  }
}
