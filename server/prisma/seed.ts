import { PrismaClient } from "@prisma/client";
import { genderSeed } from "./seed/genderSeed";
import { countrySeed } from "./seed/countrySeed";
import { languageSeed } from "./seed/languageSeed";
import { educationLevelSeed } from "./seed/educationLevelSeed";
import { instituteSeed } from "./seed/instituteSeed";
import { skillSeed } from "./seed/skillSeed";
import { userSeed } from "./seed/userSeed";
import { brandSeed } from "./seed/brandSeed";
import { positionSeed } from "./seed/positionSeed";
const prisma = new PrismaClient();
async function main() {
  // Seed Gender
  await genderSeed();
  // Seed Country
  await countrySeed();
  // Seed Language
  await languageSeed();
  // Seed EducationLevel
  await educationLevelSeed();
  // Seed Institute
  await instituteSeed();
  // Seed Skill
  await skillSeed();
  // Seed User
  await userSeed();

  // Seed Brand
  await brandSeed();

  // Seed Position
  await positionSeed();


  console.log('Seed completed successfully!');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });