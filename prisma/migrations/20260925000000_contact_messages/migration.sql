CREATE TABLE IF NOT EXISTS "contact_messages" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "phone" TEXT NOT NULL,
  "email" TEXT,
  "topic" TEXT NOT NULL DEFAULT 'GENERAL',
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "source" TEXT NOT NULL DEFAULT 'website',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "contact_messages_status_createdAt_idx" ON "contact_messages"("status", "createdAt");
