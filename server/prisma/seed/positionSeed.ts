import prisma from "../../src/lib/prisma";

export async function positionSeed() {
  const data = [
    { title: "Software Engineer", level: "Junior", department: "Engineering" },
    { title: "Product Manager", level: "Mid", department: "Product" },
    { title: "Data Scientist", level: "Senior", department: "Data" },
  ];
  for (const record of data) {
    await prisma.position.upsert({
      where: { title: record.title },
      create: record,
      update: record,
    });
  }
}
