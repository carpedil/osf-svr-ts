/*
  Warnings:

  - You are about to drop the column `comment` on the `ApiMessage` table. All the data in the column will be lost.
  - The `send_p0` column on the `ApiMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `received_p0` column on the `ApiMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `send_p1` column on the `ApiMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `received_p1` column on the `ApiMessage` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApiMessage" DROP COLUMN "comment",
ADD COLUMN     "comment0" TEXT,
ADD COLUMN     "comment1" TEXT,
ADD COLUMN     "scenario" TEXT,
DROP COLUMN "send_p0",
ADD COLUMN     "send_p0" TEXT[],
DROP COLUMN "received_p0",
ADD COLUMN     "received_p0" TEXT[],
DROP COLUMN "send_p1",
ADD COLUMN     "send_p1" TEXT[],
DROP COLUMN "received_p1",
ADD COLUMN     "received_p1" TEXT[];
