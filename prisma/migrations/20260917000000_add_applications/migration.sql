-- Application form submissions (public apply, super-admin review).
-- NOTE: applied via `prisma db push` (older migrations cannot replay on a
-- shadow database, so `migrate dev` is unusable in this project).
CREATE TYPE "ApplicationType" AS ENUM ('DOCTOR', 'HOSPITAL');
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "type" "ApplicationType" NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT,
    "degree" TEXT,
    "speciality" TEXT,
    "username" TEXT,
    "hospitalName" TEXT,
    "slug" TEXT,
    "division" TEXT,
    "district" TEXT,
    "thana" TEXT,
    "addressLine" TEXT,
    "note" TEXT,
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "applications_status_createdAt_idx" ON "applications"("status", "createdAt");
CREATE INDEX "applications_type_status_idx" ON "applications"("type", "status");
