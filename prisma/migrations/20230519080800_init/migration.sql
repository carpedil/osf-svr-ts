-- CreateTable
CREATE TABLE "NavMenu" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "NavMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NavFunc" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nav_path" TEXT NOT NULL,

    CONSTRAINT "NavFunc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SendMessage" (
    "id" SERIAL NOT NULL,
    "function" TEXT NOT NULL,
    "edition" TEXT NOT NULL,
    "invoke" TEXT NOT NULL,
    "sendto" TEXT NOT NULL,
    "send_parms" TEXT NOT NULL,
    "received" TEXT NOT NULL,
    "received_params" TEXT NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SendMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NavMenu_path_key" ON "NavMenu"("path");

-- CreateIndex
CREATE UNIQUE INDEX "NavFunc_path_key" ON "NavFunc"("path");

-- CreateIndex
CREATE UNIQUE INDEX "NavFunc_name_key" ON "NavFunc"("name");

-- AddForeignKey
ALTER TABLE "NavFunc" ADD CONSTRAINT "NavFunc_nav_path_fkey" FOREIGN KEY ("nav_path") REFERENCES "NavMenu"("path") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SendMessage" ADD CONSTRAINT "SendMessage_function_fkey" FOREIGN KEY ("function") REFERENCES "NavFunc"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
