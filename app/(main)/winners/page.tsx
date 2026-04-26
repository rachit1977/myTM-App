import { Trophy, MapPin } from "lucide-react";
import { AppBar } from "@/components/layout/app-bar";
import { winners } from "@/lib/seed";
import { formatThaiDate } from "@/lib/utils";

export default function WinnersPage() {
  const grouped = winners.reduce<Record<string, typeof winners>>((acc, w) => {
    (acc[w.drawDate] ||= []).push(w);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <>
      <AppBar title="ประกาศผู้โชคดี" />
      <div className="px-4 py-4">
        <div className="mb-5 flex items-center gap-3 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-50 p-4 dark:from-amber-950/40 dark:to-yellow-900/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-200 text-amber-800 dark:bg-amber-800/60 dark:text-amber-100">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold">ขอแสดงความยินดี!</p>
            <p className="text-xs text-muted-foreground">
              รายชื่อผู้โชคดีจากกิจกรรมที่ผ่านมา
            </p>
          </div>
        </div>

        {sortedDates.map((date) => (
          <section key={date} className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-semibold">
                ประกาศผลวันที่ {formatThaiDate(date)}
              </h2>
              <span className="text-[11px] text-muted-foreground">
                {grouped[date].length} รางวัล
              </span>
            </div>
            <ul className="space-y-2">
              {grouped[date].map((w, i) => (
                <li
                  key={w.id}
                  className="flex items-center gap-3 rounded-xl border bg-card p-3"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{w.name}</p>
                    <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {w.province}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">รางวัล</p>
                    <p className="text-xs font-semibold text-primary">
                      {w.prize}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
