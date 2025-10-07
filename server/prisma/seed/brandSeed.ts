import prisma from "../../src/lib/prisma";

export async function brandSeed() {
  const data = [
    { name: "Google", website_url: "https://www.google.com", industry: "Technology" },
    { name: "Microsoft", website_url: "https://www.microsoft.com", industry: "Technology" },
    { name: "Amazon", website_url: "https://www.amazon.com", industry: "E-commerce" },
  ];
  for (const record of data) {
    await prisma.brand.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
