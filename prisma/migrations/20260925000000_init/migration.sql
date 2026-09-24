-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('FTL', 'PTL', 'WAREHOUSING', 'SUPPLY_CHAIN', 'OTHER');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('NOT_SURE', 'SMALL_COMMERCIAL', 'LCV', 'ICV', 'HCV', 'TRAILER', 'CONTAINER');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CLOSED', 'SPAM');

-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PENDING', 'SENT', 'FAILED');

-- CreateTable
CREATE TABLE "QuoteRequest" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "deliveryLocation" TEXT NOT NULL,
    "serviceType" "ServiceType" NOT NULL,
    "approxLoad" TEXT,
    "vehicleType" "VehicleType" NOT NULL DEFAULT 'NOT_SURE',
    "pickupDate" DATE,
    "message" TEXT,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "ipHash" TEXT NOT NULL,
    "sourcePage" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'NEW',
    "emailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "QuoteRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "message" TEXT NOT NULL,
    "consentAt" TIMESTAMP(3) NOT NULL,
    "ipHash" TEXT NOT NULL,
    "emailStatus" "EmailStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuoteRequest_createdAt_idx" ON "QuoteRequest"("createdAt");

-- CreateIndex
CREATE INDEX "QuoteRequest_ipHash_createdAt_idx" ON "QuoteRequest"("ipHash", "createdAt");

-- CreateIndex
CREATE INDEX "ContactMessage_ipHash_createdAt_idx" ON "ContactMessage"("ipHash", "createdAt");

