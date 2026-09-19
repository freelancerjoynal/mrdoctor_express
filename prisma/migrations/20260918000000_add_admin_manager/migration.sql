-- Add ADMIN_MANAGER to the Role enum (applied via `prisma db push`).
ALTER TYPE "Role" ADD VALUE IF NOT EXISTS 'ADMIN_MANAGER';
