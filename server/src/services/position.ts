import prisma from "../lib/prisma";

export const positionGet = async () => {
  return prisma.position.findMany();
};
