import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().min(2).max(60),
  phone: z.string().min(9).max(20).regex(/^[0-9-]+$/),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(/[A-Za-z]/)
    .regex(/[0-9]/),
});

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "ข้อมูลไม่ถูกต้อง", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { fullName, phone, email, password } = parsed.data;
  const emailLc = email.toLowerCase();

  const exists = await prisma.user.findFirst({
    where: { OR: [{ email: emailLc }, { phone }] },
  });
  if (exists) {
    return NextResponse.json(
      { error: "อีเมลหรือเบอร์โทรนี้ถูกใช้งานแล้ว" },
      { status: 409 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      fullName,
      email: emailLc,
      phone,
      passwordHash,
      tier: "Silver",
      points: 0,
    },
  });

  // Welcome notification
  await prisma.notification.create({
    data: {
      userId: user.id,
      type: "system",
      title: "ยินดีต้อนรับสู่ myTM",
      message:
        "ขอบคุณที่ลงทะเบียนเป็นสมาชิก myTM คุณจะได้รับข่าวสาร โปรโมชั่น และสิทธิ์พิเศษมากมาย",
      read: false,
    },
  });

  return NextResponse.json({ ok: true, userId: user.id }, { status: 201 });
}
