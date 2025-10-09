import prisma from '../lib/prisma';

export const GetSkills = async () => {
    return await prisma.skill.findMany();
}