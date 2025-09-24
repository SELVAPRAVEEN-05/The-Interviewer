import prisma from "../../src/lib/prisma";

export async function languageSeed() {
  const data = [
    { name: "English", iso_code: "EN" },
    { name: "Hindi", iso_code: "HI" },
    { name: "Tamil", iso_code: "TA" },
  ];
  for (const record of data) {
    await prisma.language.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
