import { BottomNav } from "@/components/layout/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-background pb-16">
      <main className="flex-1">{children}</main>
      <BottomNav />
    </div>
  );
}
