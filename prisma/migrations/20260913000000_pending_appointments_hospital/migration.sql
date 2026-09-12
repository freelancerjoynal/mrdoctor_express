-- Website appointment intake: link each pending row to its hospital chamber + track source.
-- Applied directly to the live DB (migrate dev shadow is broken by pre-existing drift);
-- kept here so future `migrate deploy` stays consistent (all statements are idempotent).
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "hospitalId" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "hospitalName" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "source" TEXT NOT NULL DEFAULT 'whatsapp';
ALTER TABLE "pending_appointments" ALTER COLUMN "phoneNumber" SET DEFAULT '';

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'pending_appointments_hospitalId_fkey') THEN
    ALTER TABLE "pending_appointments" ADD CONSTRAINT "pending_appointments_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "pending_appointments_doctorId_status_idx" ON "pending_appointments"("doctorId", "status");
CREATE INDEX IF NOT EXISTS "pending_appointments_hospitalId_status_idx" ON "pending_appointments"("hospitalId", "status");

-- Patient type (NEW | RENEW), chosen on the website booking form.
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "patientType" TEXT NOT NULL DEFAULT 'NEW';
