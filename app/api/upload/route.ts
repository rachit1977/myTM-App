import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { requireUser } from "@/lib/api";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  const { error, userId } = await requireUser();
  if (error) return error;

  const form = await req.formData();
  const file = form.get("file");
  const prefix = (form.get("prefix") as string | null) ?? "uploads";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "missing file" }, { status: 400 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { error: "ชนิดไฟล์ไม่รองรับ (jpg/png/webp/gif เท่านั้น)" },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "ไฟล์ใหญ่เกินไป (สูงสุด 5MB)" },
      { status: 413 }
    );
  }

  const safePrefix = prefix.replace(/[^a-z0-9_-]/gi, "");
  const ext = file.name.split(".").pop() || "bin";
  const key = `${safePrefix}/${userId}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 8)}.${ext}`;

  const blob = await put(key, file, {
    access: "private",
    addRandomSuffix: false,
  });

  // Private blob URLs require auth; expose them through our proxy so
  // <img>/<Image> can load them while keeping the bucket private.
  const proxyUrl = `/api/files?u=${encodeURIComponent(blob.url)}`;
  return NextResponse.json({ url: proxyUrl });
}
