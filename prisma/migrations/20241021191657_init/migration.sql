/*
  Warnings:

  - You are about to drop the column `userId` on the `Design` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Design" DROP CONSTRAINT "Design_userId_fkey";

-- AlterTable
ALTER TABLE "Design" DROP COLUMN "userId";
