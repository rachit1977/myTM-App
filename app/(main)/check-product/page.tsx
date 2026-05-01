"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ScanLine,
  Loader2,
  Camera,
  Keyboard,
  ImagePlus,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CheckProductPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<unknown>(null);
  const [scanning, setScanning] = useState(false);
  const [serial, setSerial] = useState("");

  // Stop the camera when component unmounts.
  useEffect(() => {
    return () => {
      const s = scannerRef.current as { stop?: () => void; destroy?: () => void } | null;
      if (s?.stop) s.stop();
      if (s?.destroy) s.destroy();
    };
  }, []);

  const handleResult = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    stopScan();
    router.push(`/check-product-result?serial=${encodeURIComponent(trimmed)}`);
  };

  const startScan = async () => {
    if (!videoRef.current) return;
    setScanning(true);
    try {
      const QrScanner = (await import("qr-scanner")).default;
      const scanner = new QrScanner(
        videoRef.current,
        (result: { data: string }) => handleResult(result.data),
        {
          highlightScanRegion: true,
          highlightCodeOutline: true,
          preferredCamera: "environment",
          maxScansPerSecond: 5,
        }
      );
      scannerRef.current = scanner;
      await scanner.start();
    } catch (e) {
      setScanning(false);
      const msg =
        e instanceof Error ? e.message : "ไม่สามารถเปิดกล้องได้";
      toast.error("เปิดกล้องไม่สำเร็จ", {
        description: msg.includes("Permission")
          ? "กรุณาอนุญาตให้แอปใช้กล้องในการตั้งค่าเบราว์เซอร์"
          : msg,
      });
    }
  };

  const stopScan = () => {
    const s = scannerRef.current as { stop?: () => void; destroy?: () => void } | null;
    if (s?.stop) s.stop();
    if (s?.destroy) s.destroy();
    scannerRef.current = null;
    setScanning(false);
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const QrScanner = (await import("qr-scanner")).default;
      const result = await QrScanner.scanImage(file, {
        returnDetailedScanResult: true,
      });
      handleResult(result.data);
    } catch {
      toast.error("ไม่พบ QR Code ในรูปนี้", {
        description: "กรุณาลองรูปอื่น หรือใช้กล้องสแกน",
      });
    }
  };

  const submitManual = () => {
    if (serial.trim().length < 4) {
      toast.error("กรุณากรอก Serial / QR ให้ถูกต้อง");
      return;
    }
    handleResult(serial);
  };

  return (
    <>
      <AppBar title="ตรวจสอบสินค้า" />
      <div className="px-4 py-4">
        <p className="mb-4 text-sm text-muted-foreground">
          สแกน QR Code บนบรรจุภัณฑ์เพื่อตรวจสอบของแท้ พร้อมข้อมูลการรับประกัน
        </p>

        <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-dashed bg-gradient-to-br from-brand-50 to-accent dark:from-brand-900/40">
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover ${
              scanning ? "opacity-100" : "opacity-0"
            }`}
            playsInline
            muted
          />
          {!scanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <Camera className="h-16 w-16 text-muted-foreground/60" />
              <p className="text-sm text-muted-foreground">
                กดปุ่มด้านล่างเพื่อเริ่มสแกน หรืออัพโหลดรูป QR
              </p>
            </div>
          )}
          {scanning && (
            <button
              type="button"
              onClick={stopScan}
              aria-label="หยุดสแกน"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur active:scale-95"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {scanning ? (
          <Button
            size="lg"
            variant="outline"
            className="mt-5 w-full"
            onClick={stopScan}
          >
            <X className="h-4 w-4" />
            หยุดสแกน
          </Button>
        ) : (
          <div className="mt-5 grid grid-cols-2 gap-2">
            <Button size="lg" onClick={startScan}>
              <ScanLine className="h-4 w-4" />
              เริ่มสแกน QR
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImagePlus className="h-4 w-4" />
              เลือกรูปจากเครื่อง
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
        )}

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
              placeholder="เช่น MTM-LIGHTER-001"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              autoCapitalize="characters"
            />
            <Button onClick={submitManual} disabled={scanning}>
              ตรวจสอบ
            </Button>
          </div>
          <p className="text-[13px] text-muted-foreground">
            ทดสอบของแท้ใช้ <span className="font-medium">MTM-LIGHTER-001</span>{" "}
            หรือสำหรับสินค้าปลอม{" "}
            <span className="font-medium">FAKE-DEMO-0001</span>
          </p>
        </div>
      </div>
    </>
  );
}
