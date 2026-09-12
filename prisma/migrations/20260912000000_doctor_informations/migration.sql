-- CreateTable doctor_informations (one-to-one with doctors)
CREATE TABLE "doctor_informations" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "expertise" JSONB NOT NULL DEFAULT '[]',
    "timeline" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_informations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctor_informations_doctorId_key" ON "doctor_informations"("doctorId");

-- AddForeignKey
ALTER TABLE "doctor_informations" ADD CONSTRAINT "doctor_informations_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
