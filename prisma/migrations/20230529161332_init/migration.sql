/*
  Warnings:

  - You are about to drop the column `seq` on the `ApiMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApiMessage" DROP COLUMN "seq",
ADD COLUMN     "scenario_no" INTEGER;
