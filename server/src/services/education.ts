import prisma from "../lib/prisma";

export const educationLevelGet = async () => {
  return prisma.educationLevel.findMany();
};
