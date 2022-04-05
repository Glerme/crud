-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "gameAvatarId" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarId" INTEGER;

-- CreateTable
CREATE TABLE "Avatar" (
    "avatarId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Avatar_pkey" PRIMARY KEY ("avatarId")
);

-- CreateTable
CREATE TABLE "GameAvatar" (
    "gameAvatarId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameAvatar_pkey" PRIMARY KEY ("gameAvatarId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Avatar_name_key" ON "Avatar"("name");

-- CreateIndex
CREATE UNIQUE INDEX "GameAvatar_name_key" ON "GameAvatar"("name");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameAvatarId_fkey" FOREIGN KEY ("gameAvatarId") REFERENCES "GameAvatar"("gameAvatarId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "Avatar"("avatarId") ON DELETE SET NULL ON UPDATE CASCADE;
