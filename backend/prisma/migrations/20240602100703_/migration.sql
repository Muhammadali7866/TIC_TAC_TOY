/*
  Warnings:

  - You are about to drop the `comments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tests` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "socketId" TEXT;

-- DropTable
DROP TABLE "comments";

-- DropTable
DROP TABLE "testModel";

-- DropTable
DROP TABLE "tests";
