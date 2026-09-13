ALTER TABLE "confirmed_appointments" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE "confirmed_appointments" ADD COLUMN IF NOT EXISTS "createdByName" TEXT;
CREATE INDEX IF NOT EXISTS "confirmed_appointments_createdBy_idx" ON "confirmed_appointments"("createdBy");
ALTER TABLE "served_appointments" ADD COLUMN IF NOT EXISTS "createdBy" TEXT;
ALTER TABLE "served_appointments" ADD COLUMN IF NOT EXISTS "createdByName" TEXT;
CREATE INDEX IF NOT EXISTS "served_appointments_createdBy_idx" ON "served_appointments"("createdBy");
