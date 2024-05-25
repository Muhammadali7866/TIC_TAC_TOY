/*
  Warnings:

  - You are about to alter the column `name` on the `comments` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- CreateTable
CREATE TABLE "testModel" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "testModel_pkey" PRIMARY KEY ("id")
);
