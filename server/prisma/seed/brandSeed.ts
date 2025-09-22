import prisma from "../../src/lib/prisma";

export async function brandSeed() {
  const data = [
    {
      name: "Google",
      website_url: "https://www.google.com",
      industry: "Technology",
      created_at: new Date(),
    },
    {
      name: "Microsoft",
      website_url: "https://www.microsoft.com",
      industry: "Technology",
      created_at: new Date(),
    },
    {
      name: "Amazon",
      website_url: "https://www.amazon.com",
      industry: "E-commerce",
      created_at: new Date(),
    },
  ];
  for (const record of data) {
    await prisma.brand.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
