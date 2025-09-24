import prisma from "../lib/prisma";
export async function GetInstitute() {
    return await prisma.institute.findMany();
}