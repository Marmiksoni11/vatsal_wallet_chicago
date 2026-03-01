import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { VENDOR_SEEDS } from "@/lib/vendor-seeds";

// Seed vendors on first GET if none exist
async function ensureSeeded() {
  const count = await prisma.vendor.count();
  if (count === 0) {
    for (const v of VENDOR_SEEDS) {
      await prisma.vendor.create({
        data: {
          name: v.name,
          category: v.category,
          description: v.description,
          neighborhood: v.neighborhood,
          zipCode: v.zipCode,
          isLocal: v.isLocal,
          isPromoted: v.isPromoted,
          website: v.website,
          phone: v.phone,
          offers: {
            create: v.offers.map(o => ({
              title: o.title,
              description: o.description,
              discountPct: o.discountPct ?? null,
              discountAmt: o.discountAmt ?? null,
              code: o.code,
              isActive: true,
            })),
          },
        },
      });
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    await ensureSeeded();

    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const neighborhood = url.searchParams.get("neighborhood");

    const where: Record<string, unknown> = { approved: true };
    if (category) where.category = category;
    if (neighborhood) where.neighborhood = neighborhood;

    const vendors = await prisma.vendor.findMany({
      where,
      include: { offers: { where: { isActive: true } } },
      orderBy: [{ isPromoted: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ vendors });
  } catch (err) {
    console.error("Vendors error:", err);
    return NextResponse.json({ vendors: [] }, { status: 500 });
  }
}
