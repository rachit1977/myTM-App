import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api";

const createSchema = z.object({
  productSlug: z.string().min(1),
  topic: z.string().min(3).max(80),
  detail: z.string().min(10).max(500),
  imageUrls: z.array(z.string().min(1).max(500)).max(4).optional(),
});

export async function GET() {
  const { error, userId } = await requireUser();
  if (error) return error;

  const reports = await prisma.report.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      product: { select: { slug: true, name: true, imageUrl: true } },
    },
  });
  return NextResponse.json(reports);
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
  const { productSlug, topic, detail, imageUrls = [] } = parsed.data;
  const product = await prisma.product.findUnique({ where: { slug: productSlug } });
  if (!product) {
    return NextResponse.json({ error: "ไม่พบสินค้า" }, { status: 404 });
  }

  const report = await prisma.report.create({
    data: {
      userId,
      productId: product.id,
      topic,
      detail,
      imageUrls,
      status: "pending",
    },
    include: { product: { select: { slug: true, name: true, imageUrl: true } } },
  });

  await prisma.notification.create({
    data: {
      userId,
      type: "report",
      title: "ส่งคำร้องสำเร็จ",
      message: `คำร้องเรื่อง "${topic}" ของคุณถูกส่งเข้าระบบแล้ว ทีมงานจะติดต่อกลับภายใน 1-2 วันทำการ`,
      href: "/report",
      read: false,
    },
  });

  return NextResponse.json(report, { status: 201 });
}
