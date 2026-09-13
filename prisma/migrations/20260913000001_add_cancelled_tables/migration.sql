-- CreateTable
CREATE TABLE "cancelled_appointments_online" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "doctorName" TEXT,
    "patientName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "patientType" TEXT NOT NULL DEFAULT 'NEW',
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "serial" INTEGER NOT NULL DEFAULT 0,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reason" TEXT,
    "requestedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cancelled_appointments_online_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cancelled_appointments_local" (
    "id" TEXT NOT NULL,
    "appointmentId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "doctorName" TEXT,
    "patientName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "patientType" TEXT NOT NULL DEFAULT 'NEW',
    "appointmentDate" TIMESTAMP(3) NOT NULL,
    "serial" INTEGER NOT NULL DEFAULT 0,
    "amount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reason" TEXT,
    "requestedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cancelled_appointments_local_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cancelled_appointments_online_appointmentId_key" ON "cancelled_appointments_online"("appointmentId");

-- CreateIndex
CREATE INDEX "cancelled_appointments_online_doctorId_idx" ON "cancelled_appointments_online"("doctorId");

-- CreateIndex
CREATE UNIQUE INDEX "cancelled_appointments_local_appointmentId_key" ON "cancelled_appointments_local"("appointmentId");

-- CreateIndex
CREATE INDEX "cancelled_appointments_local_doctorId_idx" ON "cancelled_appointments_local"("doctorId");
