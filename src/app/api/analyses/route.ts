import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const analyses = await prisma.analysis.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return NextResponse.json({ analyses });
}

export async function POST(req: NextRequest) {
  const session = await verifySession();
  // Allow anonymous analyses too
  try {
    const body = await req.json();
    const analysis = await prisma.analysis.create({
      data: {
        userId: session?.userId ?? null,
        zip: body.zip,
        categories: JSON.stringify(body.categories || []),
        discounts: JSON.stringify(body.discounts || []),
        selectedPlans: JSON.stringify(body.selectedPlans || []),
        totalSavings: body.totalSavings || 0,
        annualSavings: body.annualSavings || 0,
      },
    });
    return NextResponse.json({ success: true, analysis }, { status: 201 });
  } catch (err) {
    console.error("Save analysis error:", err);
    return NextResponse.json({ error: "Failed to save analysis" }, { status: 500 });
  }
}
