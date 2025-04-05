const { PrismaClient } = require("@prisma/client");

//import { useTranslations } from 'next-intl';
//const t = useTranslations('Categories');

const db = new PrismaClient();

async function main() {
  try {
    await db.generalCategory.createMany({
      data: [
        //{ name: t('nutrition') },
        { name: "Nutrition" },
        { name: "Sports" },
        //{ name: "Famous People" },
        //{ name: "Movies & TV" },
        //{ name: "Musicians" },
        //{ name: "Games" },
        //{ name: "Animals" },
        //{ name: "Philosophy" },
        //{ name: "Scientists" },
      ],
    });
  } catch (error) {
    console.error("Error seeding default categories", error);
  } finally {
    db.$disconnect();
  }
}

main();
