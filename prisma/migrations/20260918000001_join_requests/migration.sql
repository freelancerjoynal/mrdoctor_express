-- Rename Application -> JoinRequest (data preserved) + new join-context columns.
-- NOTE: applied directly (older migrations cannot replay on a shadow
-- database, so `migrate dev` is unusable in this project).
ALTER TABLE "applications" RENAME TO "join_requests";
ALTER TYPE "ApplicationType" RENAME TO "JoinRequestType";
ALTER TYPE "ApplicationStatus" RENAME TO "JoinRequestStatus";
ALTER TABLE "join_requests" ADD COLUMN IF NOT EXISTS "foundUs" TEXT;
ALTER TABLE "join_requests" ADD COLUMN IF NOT EXISTS "joinReason" TEXT;
