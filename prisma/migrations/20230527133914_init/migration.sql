/*
  Warnings:

  - You are about to drop the `SendMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SendMessage" DROP CONSTRAINT "SendMessage_function_fkey";

-- DropTable
DROP TABLE "SendMessage";

-- CreateTable
CREATE TABLE "ApiMessage" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "func" TEXT NOT NULL,
    "edition0" TEXT NOT NULL,
    "sendto0" TEXT NOT NULL,
    "send_p0" TEXT NOT NULL,
    "received0" TEXT NOT NULL,
    "received_p0" TEXT NOT NULL,
    "edition1" TEXT NOT NULL,
    "sendto1" TEXT NOT NULL,
    "send_p1" TEXT NOT NULL,
    "received1" TEXT NOT NULL,
    "received_p1" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiMessage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiMessage" ADD CONSTRAINT "ApiMessage_func_fkey" FOREIGN KEY ("func") REFERENCES "NavFunc"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
