-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active',
ALTER COLUMN "date_of_birth" DROP NOT NULL;
