-- CreateTable
CREATE TABLE "served_appointments" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "doctorName" TEXT,
    "patientName" TEXT NOT NULL,
    "patientType" TEXT NOT NULL DEFAULT 'NEW',
    "contactPhone" TEXT NOT NULL,
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "serial" INTEGER NOT NULL DEFAULT 0,
    "chamberId" TEXT,
    "chamberName" TEXT,
    "bookingType" "BookingType" NOT NULL DEFAULT 'OFFLINE',
    "collectionAmount" DOUBLE PRECISION,
    "paymentAmount" DOUBLE PRECISION,
    "servedBy" TEXT NOT NULL,
    "servedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "served_appointments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "served_appointments_appointmentId_key" ON "served_appointments"("appointmentId");

-- CreateIndex
CREATE INDEX "served_appointments_doctorId_appointmentDate_idx" ON "served_appointments"("doctorId", "appointmentDate");
