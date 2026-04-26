export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-background dark:from-brand-900/30 dark:to-background">
      <div className="mx-auto max-w-md px-5 py-8">{children}</div>
    </div>
  );
}
