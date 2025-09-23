/*
  Warnings:

  - The primary key for the `Brand` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Brand` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Country` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `EducationLevel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `EducationLevel` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Gender` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Gender` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Institute` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Institute` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Language` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Position` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Position` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Skill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Skill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `brandId` on the `BrandPosition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `positionId` on the `BrandPosition` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `educationLevelId` on the `EducationDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `instituteId` on the `EducationDetail` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `countryId` on the `Institute` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `genderId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `countryId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `languageId` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `skillId` on the `UserSkill` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."BrandPosition" DROP CONSTRAINT "BrandPosition_brandId_fkey";

-- DropForeignKey
ALTER TABLE "public"."BrandPosition" DROP CONSTRAINT "BrandPosition_positionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EducationDetail" DROP CONSTRAINT "EducationDetail_educationLevelId_fkey";

-- DropForeignKey
ALTER TABLE "public"."EducationDetail" DROP CONSTRAINT "EducationDetail_instituteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Institute" DROP CONSTRAINT "Institute_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_countryId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_genderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_languageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserSkill" DROP CONSTRAINT "UserSkill_skillId_fkey";

-- AlterTable
ALTER TABLE "public"."Brand" DROP CONSTRAINT "Brand_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Brand_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."BrandPosition" DROP COLUMN "brandId",
ADD COLUMN     "brandId" INTEGER NOT NULL,
DROP COLUMN "positionId",
ADD COLUMN     "positionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Country" DROP CONSTRAINT "Country_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Country_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."EducationDetail" DROP COLUMN "educationLevelId",
ADD COLUMN     "educationLevelId" INTEGER NOT NULL,
DROP COLUMN "instituteId",
ADD COLUMN     "instituteId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."EducationLevel" DROP CONSTRAINT "EducationLevel_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EducationLevel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Gender" DROP CONSTRAINT "Gender_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Gender_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Institute" DROP CONSTRAINT "Institute_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "countryId",
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD CONSTRAINT "Institute_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Language" DROP CONSTRAINT "Language_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Position" DROP CONSTRAINT "Position_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Position_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."Skill" DROP CONSTRAINT "Skill_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Skill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "genderId",
ADD COLUMN     "genderId" INTEGER NOT NULL,
DROP COLUMN "countryId",
ADD COLUMN     "countryId" INTEGER NOT NULL,
DROP COLUMN "languageId",
ADD COLUMN     "languageId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserSkill" DROP COLUMN "skillId",
ADD COLUMN     "skillId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Institute" ADD CONSTRAINT "Institute_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "public"."Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "public"."EducationLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSkill" ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BrandPosition" ADD CONSTRAINT "BrandPosition_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."BrandPosition" ADD CONSTRAINT "BrandPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
