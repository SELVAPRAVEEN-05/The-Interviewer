import prisma from "../../src/lib/prisma";

export async function skillSeed() {
  const data = [
    { name: "JavaScript", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "C programming", category: "Programming" },
    { name: "C++", category: "Programming" },
    { name: "Communication", category: "Soft Skill" },
    { name: "Public Speaking", category: "Soft Skill" },

  ];
  for (const record of data) {
    await prisma.skill.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
