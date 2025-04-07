const { PrismaClient } = require("@prisma/client");

//import { useTranslations } from 'next-intl';
//const t = useTranslations('Categories');

const db = new PrismaClient();

async function main() {
  try {
    await db.generalCategory.createMany({
      data: [
        //{ name: t('nutrition') },
        //{ name: "Nutrition" },
        //{ name: "Sports" },
        //{ name: "Famous People" },
        //{ name: "Movies & TV" },
        //{ name: "Musicians" },
        //{ name: "Games" },
        //{ name: "Animals" },
        //{ name: "Philosophy" },
        //{ name: "Science" },
        //{ name: "History" },
        //{ name: "Other" },
        //{ name: "Nutrition" },
  //{ name: "Sports" },
  { name: "Famous People" },
  { name: "Movies & TV" },
  { name: "Musicians" },
  { name: "Games" },
  { name: "Animals" },
  //{ name: "Philosophy" },
  //{ name: "Science" },
  //{ name: "History" },
  { name: "Technology" },
  { name: "Health & Fitness" },
  { name: "Travel" },
  { name: "Art & Design" },
  { name: "Books & Literature" },
  { name: "Politics" },
  { name: "Business & Finance" },
  { name: "Education" },
  { name: "Relationships" },
  { name: "Spirituality & Religion" },
  { name: "Environment" },
  { name: "DIY & Crafts" },
  { name: "Fashion" },
  { name: "Parenting" },
  { name: "Psychology" },
  { name: "Language & Linguistics" },
  { name: "Pop Culture" },
  { name: "Mythology" },
  { name: "Law & Crime" },
  { name: "Other" }
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    db.$disconnect();
  }
}

main();
