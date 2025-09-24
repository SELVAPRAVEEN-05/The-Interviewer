import prisma from "../../src/lib/prisma";

export async function countrySeed() {
  const data = [
    { name: "India", iso_code: "IN" },
    { name: "United States", iso_code: "US" },
    { name: "United Kingdom", iso_code: "UK" },
  ];
  for (const record of data) {
    await prisma.country.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
