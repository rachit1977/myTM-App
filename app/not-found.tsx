import Link from "next/link";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <Compass className="h-16 w-16 text-muted-foreground" />
      <h1 className="mt-4 text-2xl font-bold">ไม่พบหน้าที่ค้นหา</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        ลิงก์อาจถูกย้ายหรือเป็นลิงก์ที่ไม่ถูกต้อง
      </p>
      <Button asChild size="lg" className="mt-6">
        <Link href="/home">กลับหน้าแรก</Link>
      </Button>
    </div>
  );
}
