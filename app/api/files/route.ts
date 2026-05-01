import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api";

const ALLOWED_HOST = /^[a-z0-9-]+\.(public|private)\.blob\.vercel-storage\.com$/;

export async function GET(req: Request) {
  const { error } = await requireUser();
  if (error) return error;

  const u = new URL(req.url).searchParams.get("u");
  if (!u) {
    return NextResponse.json({ error: "missing u" }, { status: 400 });
  }

  let target: URL;
  try {
    target = new URL(u);
  } catch {
    return NextResponse.json({ error: "bad url" }, { status: 400 });
  }
  if (!ALLOWED_HOST.test(target.hostname)) {
    return NextResponse.json({ error: "host not allowed" }, { status: 400 });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const upstream = await fetch(target.toString(), {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  if (!upstream.ok) {
    return NextResponse.json(
      { error: "upstream error", status: upstream.status },
      { status: 502 }
    );
  }

  const contentType =
    upstream.headers.get("content-type") ?? "application/octet-stream";

  return new Response(upstream.body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "private, max-age=300",
    },
  });
}
