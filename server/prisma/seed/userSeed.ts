import prisma from "../../src/lib/prisma";

export async function userSeed() {
  // You may want to update genderId, countryId, languageId after seeding those tables
  const genders = await prisma.gender.findMany();
  const countries = await prisma.country.findMany();
  const languages = await prisma.language.findMany();
  const data = [
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      mobile_number: "1234567890",
      date_of_birth: new Date("1990-01-01"),
      genderId: genders[0]?.id || "",
      countryId: countries[0]?.id || "",
      languageId: languages[0]?.id || "",
      role: "user",
      github_url: "https://github.com/johndoe",
      linkedin_url: "https://linkedin.com/in/johndoe",
      portfolio_url: "https://johndoe.com",
      resume_url: "https://johndoe.com/resume.pdf",
      profile_picture_url: "https://johndoe.com/profile.jpg",
      created_at: new Date(),
    },
  ];
  for (const record of data) {
    await prisma.user.upsert({
      where: { email: record.email },
      create: record,
      update: record,
    });
  }
}
