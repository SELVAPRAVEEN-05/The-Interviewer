import prisma from "../../src/lib/prisma";

export async function instituteSeed() {
  // You may want to update countryId after seeding countries
  const data = [
    { name: "IIT Madras", city: "Chennai", state: "Tamil Nadu", countryId: "", },
    { name: "MIT", city: "Cambridge", state: "Massachusetts", countryId: "", },
  ];
  // You must update countryId after seeding countries
  const countries = await prisma.country.findMany();
  if (countries.length > 0) {
    data[0].countryId = countries[0].id;
    data[1].countryId = countries[1] ? countries[1].id : countries[0].id;
  }
  for (const record of data) {
    await prisma.institute.upsert({
      where: { name: record.name },
      create: record,
      update: record,
    });
  }
}
