import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { offerId } = await req.json();
    if (!offerId) return NextResponse.json({ error: "offerId required" }, { status: 400 });

    const existing = await prisma.claimedOffer.findUnique({
      where: { userId_offerId: { userId: session.userId, offerId } },
    });

    if (existing) {
      return NextResponse.json({ error: "Offer already claimed" }, { status: 409 });
    }

    const claimed = await prisma.claimedOffer.create({
      data: { userId: session.userId, offerId },
    });

    return NextResponse.json({ success: true, claimed }, { status: 201 });
  } catch (err) {
    console.error("Claim offer error:", err);
    return NextResponse.json({ error: "Failed to claim offer" }, { status: 500 });
  }
}

export async function GET() {
  const session = await verifySession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const claimed = await prisma.claimedOffer.findMany({
    where: { userId: session.userId },
    include: { offer: { include: { vendor: true } } },
    orderBy: { claimedAt: "desc" },
  });

  return NextResponse.json({ claimed });
}
