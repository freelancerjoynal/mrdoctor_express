ALTER TABLE "doctors" ADD COLUMN IF NOT EXISTS "businessCardImage" TEXT;
ALTER TABLE "doctors" ADD COLUMN IF NOT EXISTS "bannerCardImage" TEXT;
ALTER TABLE "hospitals" ADD COLUMN IF NOT EXISTS "businessCardImage" TEXT;
ALTER TABLE "hospitals" ADD COLUMN IF NOT EXISTS "bannerCardImage" TEXT;
