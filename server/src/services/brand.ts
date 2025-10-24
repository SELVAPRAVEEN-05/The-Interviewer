import prisma from "../lib/prisma";

export const brandGet = async () => {
  return prisma.brand.findMany();
};
