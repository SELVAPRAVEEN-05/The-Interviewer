import prisma from "../lib/prisma";

export const instituteGet=async () =>{
    return prisma.institute.findMany();
}