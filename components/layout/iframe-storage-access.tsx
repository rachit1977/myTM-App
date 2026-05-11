"use client";

import { useEffect, useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * When the page is loaded inside a cross-origin iframe (e.g. Ionic/Capacitor
 * WebView), Safari ITP blocks cookies until the embedded site explicitly
 * requests Storage Access via a user gesture.
 *
 * This component:
 *  1. Detects iframe + lack of cookie storage access
 *  2. Shows a fullscreen prompt with a single tap-to-continue button
 *  3. Calls `document.requestStorageAccess()` on tap (user gesture required)
 *  4. Reloads on success so NextAuth can set/read cookies normally
 *
 * Outside iframes or in browsers that grant access by default, this renders
 * nothing.
 */
export function IframeStorageAccess() {
  const [needsAccess, setNeedsAccess] = useState(false);
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const inIframe = window.self !== window.top;
    if (!inIframe) return;

    const hasFn = typeof document.hasStorageAccess === "function";
    const requestFn = typeof document.requestStorageAccess === "function";
    if (!hasFn || !requestFn) return; // not Safari / not supported

    document
      .hasStorageAccess()
      .then((ok) => setNeedsAccess(!ok))
      .catch(() => setNeedsAccess(true));
  }, []);

  const [denied, setDenied] = useState(false);
  const grant = async () => {
    setRequesting(true);
    try {
      await document.requestStorageAccess();
      window.location.reload();
    } catch {
      setRequesting(false);
      setDenied(true);
    }
  };

  const openExternal = () => {
    if (typeof window !== "undefined") {
      window.open(window.location.href, "_blank", "noopener,noreferrer");
    }
  };

  if (!needsAccess) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-200">
        <Lock className="h-7 w-7" />
      </div>
      <h2 className="mt-4 text-lg font-bold">
        {denied ? "เปิดในเบราว์เซอร์ภายนอก" : "อนุญาตการใช้คุกกี้"}
      </h2>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {denied
          ? "อุปกรณ์นี้ไม่อนุญาตให้ใช้คุกกี้ภายในแอป กรุณาแตะปุ่มด้านล่างเพื่อเปิดในเบราว์เซอร์ภายนอกแทน"
          : "เพื่อให้สามารถเข้าสู่ระบบและใช้งานแอปได้ตามปกติ กรุณาแตะปุ่มด้านล่างเพื่ออนุญาตการใช้คุกกี้"}
      </p>
      {denied ? (
        <Button
          size="lg"
          className="mt-6 w-full max-w-xs"
          onClick={openExternal}
        >
          เปิดในเบราว์เซอร์
        </Button>
      ) : (
        <Button
          size="lg"
          className="mt-6 w-full max-w-xs"
          onClick={grant}
          disabled={requesting}
        >
          {requesting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "อนุญาตและเข้าสู่ระบบ"
          )}
        </Button>
      )}
      <p className="mt-4 max-w-xs text-[11px] text-muted-foreground">
        ข้อความนี้แสดงเฉพาะใน iOS Safari/WebView เท่านั้น
      </p>
    </div>
  );
}
