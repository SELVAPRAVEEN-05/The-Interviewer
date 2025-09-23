import prisma from "../../src/lib/prisma";

export async function userSeed() {
  // Get existing reference data
  const genders = await prisma.gender.findMany();
  const countries = await prisma.country.findMany();
  const languages = await prisma.language.findMany();

  const data = [
    {
      first_name: "Raj",
      last_name: "Kumar",
      email: "navaneethakrishnan.cs23@bitsathy.ac.in",
      password: "123",
      mobile_number: "9876543210",
      date_of_birth: new Date("1995-01-15"),
      genderId: genders.find(g => g.value === "Male")?.id || genders[0]?.id || 1,
      countryId: countries.find(c => c.name === "India")?.id || countries[0]?.id || 1,
      languageId: languages.find(l => l.name === "English")?.id || languages[0]?.id || 1,
      role: "admin",
      github_url: "https://github.com/rajkumar",
      linkedin_url: "https://linkedin.com/in/rajkumar",
      portfolio_url: "https://rajkumar.dev",
      resume_url: "https://rajkumar.dev/resume.pdf",
      profile_picture_url: "https://rajkumar.dev/profile.jpg",
      created_at: new Date(),
    },
    {
      first_name: "Raja",
      last_name: "Singh",
      email: "navaneetha2006krishnan@gmail.com",
      password: "123",
      mobile_number: "9876543211",
      date_of_birth: new Date("1992-05-20"),
      genderId: genders.find(g => g.value === "Male")?.id || genders[0]?.id || 1,
      countryId: countries.find(c => c.name === "India")?.id || countries[0]?.id || 1,
      languageId: languages.find(l => l.name === "English")?.id || languages[0]?.id || 1,
      role: "interviewer",
      github_url: "https://github.com/rajasingh",
      linkedin_url: "https://linkedin.com/in/rajasingh",
      portfolio_url: "https://rajasingh.dev",
      resume_url: "https://rajasingh.dev/resume.pdf",
      profile_picture_url: "https://rajasingh.dev/profile.jpg",
      created_at: new Date(),
    },
    {
      first_name: "System",
      last_name: "Admin",
      email: "2006navaneethakrishnan@gmail.com",
      password: "123",
      mobile_number: "9876543212",
      date_of_birth: new Date("1990-12-10"),
      genderId: genders.find(g => g.value === "Other")?.id || genders[0]?.id || 1,
      countryId: countries.find(c => c.name === "India")?.id || countries[0]?.id || 1,
      languageId: languages.find(l => l.name === "English")?.id || languages[0]?.id || 1,
      role: "user",
      github_url: "https://github.com/systemadmin",
      linkedin_url: "https://linkedin.com/in/systemadmin",
      portfolio_url: "https://systemadmin.dev",
      resume_url: "https://systemadmin.dev/resume.pdf",
      profile_picture_url: "https://systemadmin.dev/profile.jpg",
      created_at: new Date(),
    },
    {
      first_name: "Ram",
      last_name: "Sharma",
      email: "ram.sharma@example.com",
      password: "123",
      mobile_number: "9876543213",
      date_of_birth: new Date("1988-08-25"),
      genderId: genders.find(g => g.value === "Male")?.id || genders[0]?.id || 1,
      countryId: countries.find(c => c.name === "India")?.id || countries[0]?.id || 1,
      languageId: languages.find(l => l.name === "Hindi")?.id || languages[0]?.id || 1,
      role: "candidate",
      github_url: "https://github.com/ramsharma",
      linkedin_url: "https://linkedin.com/in/ramsharma",
      portfolio_url: "https://ramsharma.dev",
      resume_url: "https://ramsharma.dev/resume.pdf",
      profile_picture_url: "https://ramsharma.dev/profile.jpg",
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
