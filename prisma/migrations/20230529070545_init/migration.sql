/*
  Warnings:

  - Added the required column `hdr` to the `ApiMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApiMessage" ADD COLUMN     "hdr" TEXT NOT NULL;
