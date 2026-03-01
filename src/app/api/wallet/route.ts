import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.walletEntry.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  const totalMonthly = entries.reduce((s, e) => s + e.monthlySave, 0);

  return NextResponse.json({ entries, totalMonthly, totalAnnual: totalMonthly * 12 });
}

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { category, prevCost, newCost, monthlySave, planName, provider } = await req.json();
    const entry = await prisma.walletEntry.create({
      data: {
        userId: session.userId,
        category,
        prevCost,
        newCost,
        monthlySave,
        planName,
        provider,
      },
    });
    return NextResponse.json({ success: true, entry }, { status: 201 });
  } catch (err) {
    console.error("Wallet error:", err);
    return NextResponse.json({ error: "Failed to save wallet entry." }, { status: 500 });
  }
}
