-- DropForeignKey
ALTER TABLE "public"."EducationDetail" DROP CONSTRAINT "EducationDetail_instituteId_fkey";

-- AlterTable
ALTER TABLE "public"."EducationDetail" ALTER COLUMN "specialization" DROP NOT NULL,
ALTER COLUMN "board_or_university" DROP NOT NULL,
ALTER COLUMN "year_of_passing" DROP NOT NULL,
ALTER COLUMN "instituteId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "portfolio_url" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;
