/*
  Warnings:

  - Added the required column `score` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."User_username_key";

-- AlterTable
ALTER TABLE "public"."Feedback" ADD COLUMN     "score" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "username" DROP DEFAULT;
