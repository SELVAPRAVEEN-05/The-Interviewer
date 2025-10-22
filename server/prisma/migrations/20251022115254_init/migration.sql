/*
  Warnings:

  - You are about to drop the column `algorithm` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `communication` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `problemSolving` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `sql` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `systemDesign` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "algorithm",
DROP COLUMN "communication",
DROP COLUMN "problemSolving",
DROP COLUMN "sql",
DROP COLUMN "systemDesign";
