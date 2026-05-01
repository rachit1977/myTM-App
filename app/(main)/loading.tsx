import { Skeleton } from "@/components/ui/skeleton";

export default function MainLoading() {
  return (
    <div className="animate-in fade-in duration-150">
      {/* AppBar placeholder */}
      <div className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background/95 px-2 backdrop-blur-md">
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="space-y-3 px-4 py-4">
        <Skeleton className="h-32 w-full rounded-2xl" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
          <Skeleton className="h-28 rounded-2xl" />
        </div>
        <Skeleton className="h-20 w-full rounded-2xl" />
      </div>
    </div>
  );
}
