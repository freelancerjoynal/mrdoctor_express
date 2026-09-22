ALTER TABLE "doctors" ADD COLUMN IF NOT EXISTS "creditBalance" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "hospitals" ADD COLUMN IF NOT EXISTS "creditBalance" INTEGER NOT NULL DEFAULT 0;
CREATE TABLE IF NOT EXISTS "credit_ledger" (
  "id" TEXT NOT NULL,
  "ownerType" TEXT NOT NULL,
  "doctorId" TEXT,
  "hospitalId" TEXT,
  "amount" INTEGER NOT NULL,
  "balanceAfter" INTEGER NOT NULL,
  "kind" TEXT NOT NULL,
  "refType" TEXT,
  "refId" TEXT,
  "note" TEXT,
  "createdBy" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "credit_ledger_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "credit_ledger_ownerType_doctorId_createdAt_idx" ON "credit_ledger"("ownerType", "doctorId", "createdAt");
CREATE INDEX IF NOT EXISTS "credit_ledger_ownerType_hospitalId_createdAt_idx" ON "credit_ledger"("ownerType", "hospitalId", "createdAt");
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'credit_ledger_doctorId_fkey'
  ) THEN
    ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'credit_ledger_hospitalId_fkey'
  ) THEN
    ALTER TABLE "credit_ledger" ADD CONSTRAINT "credit_ledger_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;
