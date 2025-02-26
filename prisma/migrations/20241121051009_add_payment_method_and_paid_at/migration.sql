/*
  Warnings:

  - Made the column `title` on table `Design` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('card', 'cash');

-- AlterTable
ALTER TABLE "Design" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "paidAt" TIMESTAMP(3),
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'card';
