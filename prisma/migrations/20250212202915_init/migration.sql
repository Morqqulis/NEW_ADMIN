/*
  Warnings:

  - You are about to drop the column `code` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Location` table. All the data in the column will be lost.
  - Added the required column `name` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `clientId` on the `Station` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "Location_code_key";

-- DropIndex
DROP INDEX "Station_stationId_key";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "code",
DROP COLUMN "updatedAt",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Station" ALTER COLUMN "status" DROP DEFAULT,
DROP COLUMN "clientId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "website" TEXT,
    "logo" TEXT,
    "stationIds" INTEGER[],
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voice" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "voiceId" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "accent" TEXT,
    "age" INTEGER,
    "category" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Voice_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
