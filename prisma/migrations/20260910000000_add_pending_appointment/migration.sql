-- CreateTable: PendingAppointment -> pending_appointments (NOT the appointment table)
CREATE TABLE IF NOT EXISTS "pending_appointments" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "phoneNumber" TEXT NOT NULL,
  "doctorId" TEXT NOT NULL,
  "doctorName" TEXT,
  "problem" TEXT NOT NULL,
  "appointmentDate" TIMESTAMP(3) NOT NULL,
  "dayLabel" TEXT,
  "patientName" TEXT NOT NULL,
  "patientAge" INTEGER,
  "patientWeight" DOUBLE PRECISION,
  "contactPhone" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PENDING',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "pending_appointments_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE INDEX IF NOT EXISTS "pending_appointments_doctorId_idx" ON "pending_appointments"("doctorId");
CREATE INDEX IF NOT EXISTS "pending_appointments_phoneNumber_idx" ON "pending_appointments"("phoneNumber");
CREATE INDEX IF NOT EXISTS "pending_appointments_status_idx" ON "pending_appointments"("status");
