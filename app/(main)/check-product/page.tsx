"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ScanLine, Loader2, Camera, Keyboard } from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckProductPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [serial, setSerial] = useState("");

  const startScan = () => {
    setScanning(true);
    setTimeout(() => {
      const fake = `MTM-${Math.floor(Math.random() * 9000 + 1000)}-2026`;
      setScanning(false);
      router.push(`/check-product-result?serial=${encodeURIComponent(fake)}`);
    }, 1800);
  };

  const submitManual = () => {
    if (serial.trim().length < 4) {
      toast.error("กรุณากรอก Serial / QR ให้ถูกต้อง");
      return;
    }
    router.push(`/check-product-result?serial=${encodeURIComponent(serial.trim())}`);
  };

  return (
    <>
      <AppBar title="ตรวจสอบสินค้า" />
      <div className="px-4 py-4">
        <p className="mb-4 text-sm text-muted-foreground">
          สแกน QR Code บนบรรจุภัณฑ์เพื่อตรวจสอบของแท้ พร้อมข้อมูลการรับประกัน
        </p>

        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-dashed bg-gradient-to-br from-brand-50 to-accent dark:from-brand-900/40">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            {scanning ? (
              <>
                <ScanLine className="h-16 w-16 animate-pulse text-primary" />
                <p className="text-sm font-medium text-primary">
                  กำลังสแกน...
                </p>
              </>
            ) : (
              <>
                <Camera className="h-16 w-16 text-muted-foreground/60" />
                <p className="text-sm text-muted-foreground">
                  กดปุ่มด้านล่างเพื่อเริ่มสแกน
                </p>
              </>
            )}
          </div>
          {scanning && (
            <div className="pointer-events-none absolute inset-x-8 top-1/2 h-1 -translate-y-1/2 animate-pulse rounded bg-primary/70 shadow-[0_0_20px_2px] shadow-primary/60" />
          )}
        </div>

        <Button
          size="lg"
          className="mt-5 w-full"
          onClick={startScan}
          disabled={scanning}
        >
          {scanning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ScanLine className="h-4 w-4" />
          )}
          {scanning ? "กำลังสแกน..." : "เริ่มสแกน QR"}
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">หรือ</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="serial"
            className="flex items-center gap-2 text-sm font-medium"
          >
            <Keyboard className="h-4 w-4" />
            กรอกหมายเลข Serial ด้วยตนเอง
          </label>
          <div className="flex gap-2">
            <Input
              id="serial"
              placeholder="เช่น MTM-1234-2026"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              autoCapitalize="characters"
            />
            <Button onClick={submitManual} disabled={scanning}>
              ตรวจสอบ
            </Button>
          </div>
          <p className="text-[11px] text-muted-foreground">
            เคล็ดลับสำหรับทดสอบ: กรอกขึ้นต้นด้วย &quot;FAKE&quot;
            เพื่อจำลองสินค้าปลอม
          </p>
        </div>
      </div>
    </>
  );
}
