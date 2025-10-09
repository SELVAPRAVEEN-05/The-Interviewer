import prisma from "../../src/lib/prisma";

export async function genderSeed() {
  const data = [
    { value: "Male" },
    { value: "Female" }
  ];
  for (const record of data) {
    await prisma.gender.upsert({
      where: { value: record.value },
      create: record,
      update: record,
    });
  }
}
