-- CreateTable
CREATE TABLE "public"."Gender" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso_code" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "iso_code" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EducationLevel" (
    "id" SERIAL NOT NULL,
    "level_name" TEXT NOT NULL,

    CONSTRAINT "EducationLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Institute" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryId" INTEGER NOT NULL,

    CONSTRAINT "Institute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "mobile_number" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "genderId" INTEGER NOT NULL,
    "countryId" INTEGER NOT NULL,
    "languageId" INTEGER NOT NULL,
    "role" TEXT NOT NULL,
    "github_url" TEXT NOT NULL,
    "linkedin_url" TEXT NOT NULL,
    "portfolio_url" TEXT,
    "yoe" INTEGER NOT NULL DEFAULT 0,
    "resume_url" TEXT NOT NULL,
    "profile_picture_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'APPROVED',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EducationDetail" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "educationLevelId" INTEGER NOT NULL,
    "instituteId" INTEGER,
    "specialization" TEXT,
    "board_or_university" TEXT,
    "marks_obtained" DECIMAL(5,2),
    "max_marks" DECIMAL(5,2),
    "year_of_passing" INTEGER,

    CONSTRAINT "EducationDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserSkill" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,
    "proficiency" TEXT,
    "years_of_experience" INTEGER,

    CONSTRAINT "UserSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Interview" (
    "id" TEXT NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SCHEDULED',
    "session_link" TEXT NOT NULL,
    "interviewerId" TEXT NOT NULL,
    "prize" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InterviewParticipant" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sortlisted" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL,
    "joined_at" TIMESTAMP(3),
    "left_at" TIMESTAMP(3),
    "note" TEXT,

    CONSTRAINT "InterviewParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CodeSubmission" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CodeSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "website_url" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Position" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "public"."Feedback" (
    "id" TEXT NOT NULL,
    "interviewId" TEXT NOT NULL,
    "given_by_user_id" TEXT NOT NULL,
    "given_to_user_id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gender_value_key" ON "public"."Gender"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "public"."Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "public"."Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "EducationLevel_level_name_key" ON "public"."EducationLevel"("level_name");

-- CreateIndex
CREATE UNIQUE INDEX "Institute_name_key" ON "public"."Institute"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "public"."Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_name_key" ON "public"."Brand"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Position_title_key" ON "public"."Position"("title");

-- AddForeignKey
ALTER TABLE "public"."Institute" ADD CONSTRAINT "Institute_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "public"."Gender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "public"."Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."User" ADD CONSTRAINT "User_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_educationLevelId_fkey" FOREIGN KEY ("educationLevelId") REFERENCES "public"."EducationLevel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EducationDetail" ADD CONSTRAINT "EducationDetail_instituteId_fkey" FOREIGN KEY ("instituteId") REFERENCES "public"."Institute"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSkill" ADD CONSTRAINT "UserSkill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserSkill" ADD CONSTRAINT "UserSkill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "public"."Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewParticipant" ADD CONSTRAINT "InterviewParticipant_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InterviewParticipant" ADD CONSTRAINT "InterviewParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodeSubmission" ADD CONSTRAINT "CodeSubmission_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CodeSubmission" ADD CONSTRAINT "CodeSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "public"."Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserPosition" ADD CONSTRAINT "UserPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "public"."Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "public"."Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_given_by_user_id_fkey" FOREIGN KEY ("given_by_user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Feedback" ADD CONSTRAINT "Feedback_given_to_user_id_fkey" FOREIGN KEY ("given_to_user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
