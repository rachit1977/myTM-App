"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, FileText, Trash2, Download } from "lucide-react";
import { toast } from "sonner";
import { AppBar } from "@/components/layout/app-bar";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "marketing",
    label: "อนุญาตใช้ข้อมูลเพื่อการตลาด",
    desc: "อนุญาตให้ใช้ข้อมูลเพื่อนำเสนอสินค้าและโปรโมชั่นที่เหมาะสม",
    enabled: true,
  },
  {
    id: "analytics",
    label: "การวิเคราะห์การใช้งาน",
    desc: "ช่วยปรับปรุงประสบการณ์การใช้งานแอป โดยข้อมูลถูกรวบรวมแบบไม่ระบุตัวตน",
    enabled: true,
  },
  {
    id: "third_party",
    label: "แชร์ข้อมูลกับบุคคลที่สาม",
    desc: "อนุญาตให้แบ่งปันข้อมูลกับพันธมิตรเพื่อสิทธิประโยชน์เพิ่มเติม",
    enabled: false,
  },
  {
    id: "personalize",
    label: "การแนะนำส่วนบุคคล",
    desc: "ปรับเนื้อหาและข้อเสนอให้ตรงกับความสนใจของคุณ",
    enabled: true,
  },
];

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-brand" : "bg-muted"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function PrivacyPage() {
  const [items, setItems] = useState(sections);

  const toggle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, enabled: !it.enabled } : it))
    );
    toast.success("อัปเดตการตั้งค่าเรียบร้อย");
  };

  const handleDownload = () => {
    toast.success("กำลังเตรียมไฟล์ข้อมูลของคุณ", {
      description: "ระบบจะส่งลิงก์ดาวน์โหลดไปยังอีเมลภายใน 24 ชั่วโมง",
    });
  };

  const handleDelete = () => {
    toast.message("ส่งคำขอลบบัญชีแล้ว", {
      description: "ทีมงานจะติดต่อกลับเพื่อยืนยันภายใน 1-2 วันทำการ",
    });
  };

  return (
    <>
      <AppBar title="ความเป็นส่วนตัว" backHref="/profile" />
      <div className="px-4 py-4">
        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-brand-50 to-emerald-50 p-4 dark:from-brand-900/40 dark:to-emerald-950/30">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-200">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">ข้อมูลของคุณปลอดภัย</p>
            <p className="text-xs text-muted-foreground">
              myTM เข้ารหัสและจัดเก็บข้อมูลตามมาตรฐาน PDPA
            </p>
          </div>
        </div>

        <h2 className="mb-2 text-sm font-semibold">การจัดการข้อมูล</h2>
        <ul className="space-y-2">
          {items.map((s) => (
            <li
              key={s.id}
              className="flex items-start gap-3 rounded-xl border bg-card p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{s.label}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
              <Switch
                checked={s.enabled}
                onChange={() => toggle(s.id)}
                label={s.label}
              />
            </li>
          ))}
        </ul>

        <h2 className="mb-2 mt-6 text-sm font-semibold">เอกสารและข้อตกลง</h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/privacy-policy"
              className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm hover:bg-accent"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">นโยบายความเป็นส่วนตัว</span>
            </Link>
          </li>
          <li>
            <Link
              href="/terms"
              className="flex items-center gap-3 rounded-xl border bg-card p-4 text-sm hover:bg-accent"
            >
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="flex-1">ข้อกำหนดและเงื่อนไขการใช้งาน</span>
            </Link>
          </li>
        </ul>

        <h2 className="mb-2 mt-6 text-sm font-semibold">สิทธิ์ของคุณ</h2>
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full justify-start"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4" />
            ขอสำเนาข้อมูลของฉัน
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full justify-start text-destructive"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            ขอลบบัญชีและข้อมูล
          </Button>
        </div>

        <p className="mt-6 rounded-xl bg-muted/40 p-3 text-[11px] leading-relaxed text-muted-foreground">
          คุณสามารถเปลี่ยนแปลงการตั้งค่าเหล่านี้ได้ตลอดเวลา
          การถอนความยินยอมจะมีผลตั้งแต่วันที่ดำเนินการเป็นต้นไป
          และไม่กระทบการใช้ข้อมูลที่ดำเนินการไปแล้วก่อนหน้านี้
        </p>
      </div>
    </>
  );
}
