-- CreateTable
CREATE TABLE "location_portal_settings" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "division" TEXT,
    "district" TEXT,
    "thana" TEXT,
    "heroImage" TEXT,
    "headline" TEXT,
    "subheadline" TEXT,
    "description" TEXT,
    "notice" TEXT,
    "updatedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_portal_settings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_portal_settings_slug_key" ON "location_portal_settings"("slug");
