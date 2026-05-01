-- AlterTable
ALTER TABLE "Winner" ADD COLUMN     "rank" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "Winner_drawDate_rank_idx" ON "Winner"("drawDate", "rank");
