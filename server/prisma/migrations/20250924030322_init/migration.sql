/*
  Warnings:

  - You are about to drop the `BrandPosition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."BrandPosition" DROP CONSTRAINT "BrandPosition_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BrandPosition" DROP CONSTRAINT "BrandPosition_positionId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "yoe" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'APPROVED';

-- DropTable
DROP TABLE "public"."BrandPosition";

-- CreateTable
CREATE TABLE "public"."UserPosition" (
    "id" TEXT NOT NULL,
    "brandId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "positionId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserPosition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
