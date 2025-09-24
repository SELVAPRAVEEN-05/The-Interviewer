-- AlterTable
ALTER TABLE "public"."InterviewParticipant" ALTER COLUMN "joined_at" DROP NOT NULL,
ALTER COLUMN "left_at" DROP NOT NULL,
ALTER COLUMN "note" DROP NOT NULL;
