import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ serial: z.string().min(1).max(80) });

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "missing serial" }, { status: 400 });
  }
  const serial = parsed.data.serial.trim();

  const record = await prisma.productSerial.findUnique({
    where: { serial },
    include: { product: true },
  });

  if (!record) {
    return NextResponse.json({
      serial,
      isAuthentic: false,
      productName: "ไม่พบในระบบ",
      product: null,
    });
  }

  return NextResponse.json({
    serial: record.serial,
    isAuthentic: record.isAuthentic,
    productName: record.product.name,
    product: record.product.slug,
    manufacturedAt: record.manufacturedAt,
    warrantyUntil: record.warrantyUntil,
    batch: record.batch,
  });
}
