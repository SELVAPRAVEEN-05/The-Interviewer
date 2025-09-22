import prisma from "../../src/lib/prisma";

export async function positionSeed() {
  const data = [
    {
      title: "Software Engineer",
      level: "Junior",
      department: "Engineering",
      created_at: new Date(),
    },
    {
      title: "Product Manager",
      level: "Mid",
      department: "Product",
      created_at: new Date(),
    },
    {
      title: "Data Scientist",
      level: "Senior",
      department: "Data",
      created_at: new Date(),
    },
  ];
  for (const record of data) {
    await prisma.position.upsert({
      where: { title: record.title },
      create: record,
      update: record,
    });
  }
}
