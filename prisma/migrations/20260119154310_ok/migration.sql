/*
  Warnings:

  - You are about to drop the column `banExpiresAt` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "banExpiresAt",
ADD COLUMN     "banExpires" TIMESTAMP(3),
ALTER COLUMN "role" SET DEFAULT 'user',
ALTER COLUMN "banned" DROP NOT NULL,
ALTER COLUMN "banned" DROP DEFAULT;
