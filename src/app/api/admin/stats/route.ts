import { NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await verifySession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [userCount, analysisCount, vendorCount, offerCount, recentAnalyses, recentUsers] = await Promise.all([
    prisma.user.count(),
    prisma.analysis.count(),
    prisma.vendor.count(),
    prisma.offer.count({ where: { isActive: true } }),
    prisma.analysis.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 10, select: { id: true, email: true, name: true, role: true, createdAt: true } }),
  ]);

  return NextResponse.json({
    stats: { userCount, analysisCount, vendorCount, offerCount },
    recentAnalyses,
    recentUsers,
  });
}
