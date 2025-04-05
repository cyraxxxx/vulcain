import { GeneralCategories } from "@/components/categories";
import { GeneralCompanions } from "@/components/companions";
import { SearchInput } from "@/components/search-input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import {useTranslations} from 'next-intl';



interface PageProps {
  searchParams: {
    generalCategoryId: string;
    name: string;
  };
}

const HomePageTitle = () => {
  const t = useTranslations('HomePage');
  return <Card className="rounded-xl border-0 bg-primary/10">
      <CardHeader className="text-xl font-semibold text-primary/60">
      {t('howItWorks')}
      </CardHeader>
      <CardContent className="text-sm">
      <ul className="list-inside list-decimal">
        <li>{t('howItWorks1')}</li>
        <li>{t('howItWorks2')}</li>
      </ul>
      </CardContent>
    </Card>;
};


const Page = async ({ searchParams }: PageProps) => {
  const { userId } = auth();


  let data;
  if (userId) {
    data = await prismadb.generalCompanion.findMany({
      where: {
        generalCategoryId: searchParams.generalCategoryId,
        name: {
          contains: searchParams.name,
          //mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            generalMessages: {
              where: {
                userId,
              },
            },
          },
        },
      },
    });
  } else {
    data = await prismadb.generalCompanion.findMany({
      where: {
        generalCategoryId: searchParams.generalCategoryId,
        name: {
          contains: searchParams.name,
          //mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  const generalCategories = await prismadb.generalCategory.findMany();



  return (

    <div className="h-full space-y-2 p-4">
      <SearchInput />
      <GeneralCategories data={generalCategories} />
      <HomePageTitle />
      <GeneralCompanions data={data} />
    </div>
  );
};

export default Page;
