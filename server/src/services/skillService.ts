import prisma from '../lib/prisma';

export const GetSkills = async () => {
    return await prisma.skill.findMany();
}

export const GetFeedbackSkills = async () => {
    // Return skills that have been used in any FeedbackSkill entries.
    // If none exist yet, fall back to returning all skills so the client
    // still has options to display.
    const skills = await prisma.skill.findMany({
        where: {
            feedbackSkills: {
                some: {}
            }
        }
    });

    if (!skills || skills.length === 0) {
        return await prisma.skill.findMany();
    }

    return skills;
}

export const GetSkillsForInterview = async (interviewId: string) => {
    // Fetch InterviewSkill join entries for the given interview and include the Skill
    const interviewSkills = await prisma.interviewSkill.findMany({
        where: { interviewId },
        include: { skill: true }
    });
    // Map to a useful shape combining interviewSkill metadata with the skill fields
    return {skill:interviewSkills.map((is) => ({
        interviewSkillId: is.id,
        interviewId: is.interviewId,
        value: is.value,
        maxValue: is.maxValue,
        skill: {
            id: is.skill.id,
            name: is.skill.name,
            category: is.skill.category,
        }
    })),
    participant:await prisma.interview.findUnique({where:{id:interviewId},include:{participants:{select:{id:true,
        user:{
            select:{id:true,first_name:true}
        }
    }}}})
};
}