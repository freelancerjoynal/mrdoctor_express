ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "division" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "district" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "thana" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "comment" TEXT;
