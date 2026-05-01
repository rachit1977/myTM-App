import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api";

const schema = z.object({
  notificationPrefs: z.record(z.string(), z.boolean()).optional(),
  privacyPrefs: z.record(z.string(), z.boolean()).optional(),
});

export async function PATCH(req: Request) {
  const { error, userId } = await requireUser();
  if (error) return error;
  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const data: { notificationPrefs?: object; privacyPrefs?: object } = {};
  if (parsed.data.notificationPrefs) data.notificationPrefs = parsed.data.notificationPrefs;
  if (parsed.data.privacyPrefs) data.privacyPrefs = parsed.data.privacyPrefs;
  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: { notificationPrefs: true, privacyPrefs: true },
  });
  return NextResponse.json(updated);
}
