ALTER TABLE "doctor_informations" ADD COLUMN IF NOT EXISTS "highlights" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "doctor_informations" ADD COLUMN IF NOT EXISTS "highlights_en" JSONB;
ALTER TABLE "doctor_informations" ADD COLUMN IF NOT EXISTS "stats" JSONB NOT NULL DEFAULT '[]';
ALTER TABLE "doctor_informations" ADD COLUMN IF NOT EXISTS "stats_en" JSONB;
ALTER TABLE "doctor_informations" ADD COLUMN IF NOT EXISTS "aboutImage" TEXT;
