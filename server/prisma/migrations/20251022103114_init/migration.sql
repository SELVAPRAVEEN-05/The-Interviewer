/*
  Warnings:

  - You are about to drop the column `comments` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "comments",
ADD COLUMN     "negative_aspects" TEXT,
ADD COLUMN     "positive_aspects" TEXT;
