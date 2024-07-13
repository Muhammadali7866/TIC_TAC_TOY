-- CreateEnum
CREATE TYPE "friendshipStatus" AS ENUM ('pending', 'accept', 'decline');

-- CreateTable
CREATE TABLE "friendships" (
    "id" SERIAL NOT NULL,
    "requesterId" INTEGER,
    "requestedId" INTEGER,
    "status" TEXT DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "friendships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "friendships_requesterId_requestedId_key" ON "friendships"("requesterId", "requestedId");

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "friendships" ADD CONSTRAINT "friendships_requestedId_fkey" FOREIGN KEY ("requestedId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
