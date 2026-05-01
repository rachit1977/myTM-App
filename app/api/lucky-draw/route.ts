import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api";

const createSchema = z.object({
  productSlug: z.string().min(1),
  fullName: z.string().min(2).max(80),
  address: z.string().min(10).max(300),
  receiptNo: z.string().min(4).max(40),
  amount: z.number().positive(),
  productImage: z.string().min(1).max(500),
  receiptImage: z.string().min(1).max(500),
});

export async function GET() {
  const { error, userId } = await requireUser();
  if (error) return error;

  const entries = await prisma.luckyDrawEntry.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      product: { select: { slug: true, name: true, imageUrl: true } },
    },
  });
  return NextResponse.json(entries);
}

export async function POST(req: Request) {
  const { error, userId } = await requireUser();
  if (error) return error;
  const body = await req.json().catch(() => ({}));
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "ข้อมูลไม่ถูกต้อง", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  const product = await prisma.product.findUnique({
    where: { slug: data.productSlug },
  });
  if (!product) {
    return NextResponse.json({ error: "ไม่พบสินค้า" }, { status: 404 });
  }

  const entry = await prisma.luckyDrawEntry.create({
    data: {
      userId,
      productId: product.id,
      fullName: data.fullName,
      address: data.address,
      receiptNo: data.receiptNo,
      amount: data.amount,
      productImage: data.productImage,
      receiptImage: data.receiptImage,
      status: "pending",
    },
    include: { product: { select: { slug: true, name: true, imageUrl: true } } },
  });

  await prisma.notification.create({
    data: {
      userId,
      type: "lucky_draw",
      title: "ส่งข้อมูลร่วมชิงโชคสำเร็จ",
      message: `ใบเสร็จ ${data.receiptNo} ของคุณได้รับเข้าระบบแล้ว ทีมงานจะตรวจสอบภายใน 1-2 วันทำการ`,
      href: "/lucky-draw",
      read: false,
    },
  });

  return NextResponse.json(entry, { status: 201 });
}
