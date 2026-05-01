import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const list = await prisma.winner.findMany({
    orderBy: { drawDate: "desc" },
  });
  return NextResponse.json(list);
}
