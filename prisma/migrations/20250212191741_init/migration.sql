-- CreateTable
CREATE TABLE "Station" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stationId" TEXT NOT NULL,
    "locationId" INTEGER NOT NULL,
    "website" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "omniplayerUrl" TEXT,
    "clientId" TEXT NOT NULL,
    "clientSecret" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "systemPrompt" TEXT,
    "hourlyPrompt0" TEXT,
    "hourlyPrompt10" TEXT,
    "hourlyPrompt20" TEXT,
    "hourlyPrompt30" TEXT,
    "hourlyPrompt40" TEXT,
    "hourlyPrompt50" TEXT,
    "hourlyPrompt55" TEXT,
    "newsPrompt" TEXT,
    "weatherPrompt" TEXT,
    "trafficPrompt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Station_stationId_key" ON "Station"("stationId");

-- CreateIndex
CREATE UNIQUE INDEX "Location_code_key" ON "Location"("code");

-- AddForeignKey
ALTER TABLE "Station" ADD CONSTRAINT "Station_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
