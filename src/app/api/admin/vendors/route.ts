import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await verifySession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const vendors = await prisma.vendor.findMany({
    include: { offers: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ vendors });
}

export async function POST(req: NextRequest) {
  const session = await verifySession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const vendor = await prisma.vendor.create({
      data: {
        name: body.name,
        category: body.category,
        description: body.description || "",
        address: body.address || "",
        zipCode: body.zipCode || "",
        neighborhood: body.neighborhood || "",
        isLocal: body.isLocal ?? true,
        isPromoted: body.isPromoted ?? false,
        website: body.website || "",
        phone: body.phone || "",
        approved: true,
      },
    });
    return NextResponse.json({ success: true, vendor }, { status: 201 });
  } catch (err) {
    console.error("Admin vendor create error:", err);
    return NextResponse.json({ error: "Failed to create vendor" }, { status: 500 });
  }
}
