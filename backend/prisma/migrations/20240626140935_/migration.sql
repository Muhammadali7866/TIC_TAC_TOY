-- CreateEnum
CREATE TYPE "gameResult" AS ENUM ('draw');

-- AlterTable
ALTER TABLE "gamePlayer" ADD COLUMN     "result" TEXT;
