/*
  Warnings:

  - A unique constraint covering the columns `[roomId]` on the table `gamePlayer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "gamePlayer_roomId_key" ON "gamePlayer"("roomId");
