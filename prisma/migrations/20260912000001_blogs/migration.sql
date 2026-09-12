-- CreateEnum
CREATE TYPE "BlogAuthorType" AS ENUM ('DOCTOR', 'HOSPITAL', 'SUPER_ADMIN');

-- CreateEnum
CREATE TYPE "BlogStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "blogs" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL,
    "coverImage" TEXT,
    "coverGradient" TEXT NOT NULL DEFAULT 'from-emerald-500 to-teal-700',
    "coverSymbol" TEXT NOT NULL DEFAULT '✿',
    "category" TEXT NOT NULL DEFAULT 'স্বাস্থ্য টিপস',
    "tags" TEXT[] NOT NULL DEFAULT '{}',
    "authorType" "BlogAuthorType" NOT NULL DEFAULT 'DOCTOR',
    "authorName" TEXT,
    "authorUserId" TEXT,
    "doctorId" TEXT,
    "hospitalId" TEXT,
    "status" "BlogStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blogs_slug_key" ON "blogs"("slug");

-- CreateIndex
CREATE INDEX "blogs_status_publishedAt_idx" ON "blogs"("status", "publishedAt");

-- CreateIndex
CREATE INDEX "blogs_doctorId_status_idx" ON "blogs"("doctorId", "status");

-- CreateIndex
CREATE INDEX "blogs_hospitalId_status_idx" ON "blogs"("hospitalId", "status");

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
