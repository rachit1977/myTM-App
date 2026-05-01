import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api";

export async function GET() {
  const { error, userId } = await requireUser();
  if (error) return error;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatarUrl: true,
      memberSince: true,
      points: true,
      tier: true,
      notificationPrefs: true,
      privacyPrefs: true,
    },
  });
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

const patchSchema = z.object({
  fullName: z.string().min(2).max(80).optional(),
  phone: z.string().min(9).max(20).regex(/^[0-9-]+$/).optional(),
  email: z.string().email().optional(),
  avatarUrl: z
    .string()
    .min(1)
    .max(500)
    .nullable()
    .optional(),
});

export async function PATCH(req: Request) {
  const { error, userId } = await requireUser();
  if (error) return error;
  const body = await req.json().catch(() => ({}));
  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "ข้อมูลไม่ถูกต้อง", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const data = parsed.data;
  if (data.email) data.email = data.email.toLowerCase();
  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      avatarUrl: true,
      memberSince: true,
      points: true,
      tier: true,
    },
  });
  return NextResponse.json(updated);
}
