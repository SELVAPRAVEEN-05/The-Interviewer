-- CreateTable
CREATE TABLE "InterviewSkill" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL DEFAULT 0,
    "maxValue" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "InterviewSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackSkill" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "FeedbackSkill_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewSkill" ADD CONSTRAINT "InterviewSkill_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewSkill" ADD CONSTRAINT "InterviewSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackSkill" ADD CONSTRAINT "FeedbackSkill_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "Feedback"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedbackSkill" ADD CONSTRAINT "FeedbackSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
