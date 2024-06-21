-- CreateTable
CREATE TABLE "gamePlayer" (
    "id" SERIAL NOT NULL,
    "playerAId" INTEGER,
    "playerBId" INTEGER,
    "roomId" TEXT,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "gamePlayer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "gamePlayer" ADD CONSTRAINT "gamePlayer_playerAId_fkey" FOREIGN KEY ("playerAId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gamePlayer" ADD CONSTRAINT "gamePlayer_playerBId_fkey" FOREIGN KEY ("playerBId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
