import { Loader2 } from "lucide-react";
import { Logo } from "@/components/brand/logo";

export default function AuthLoading() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4">
      <Logo />
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}
