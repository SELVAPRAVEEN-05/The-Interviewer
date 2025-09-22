import prisma from "../../src/lib/prisma";

export async function educationLevelSeed() {
  const data = [
    { level_name: "High School" },
    { level_name: "Bachelor's" },
    { level_name: "Master's" },
    { level_name: "PhD" },
  ];
  for (const record of data) {
    await prisma.educationLevel.upsert({
      where: { level_name: record.level_name },
      create: record,
      update: record,
    });
  }
}
