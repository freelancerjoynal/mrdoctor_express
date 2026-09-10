-- Add selected chamber + patient area to pending_appointments
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "chamberId" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "chamberName" TEXT;
ALTER TABLE "pending_appointments" ADD COLUMN IF NOT EXISTS "patientArea" TEXT;
