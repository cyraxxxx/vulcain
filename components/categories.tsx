"use client";

import qs from "query-string";
import { GeneralCategory } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { useTranslations } from 'next-intl';

interface GeneralCategoriesProps {
  data: GeneralCategory[];
}

export const GeneralCategories = ({ data }: GeneralCategoriesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('Categories'); 

  const generalCategoryId = searchParams.get("generalCategoryId");

  const onClick = (id: string | undefined) => {
    const query = { generalCategoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="flex w-full space-x-2 overflow-x-auto p-1">
      <button
        onClick={() => onClick(undefined)}
        className={cn(
          `
          flex 
          items-center 
          rounded-md 
          bg-primary/10 
          px-2 
          py-2 
          text-center 
          text-xs 
          transition 
          hover:opacity-75 
          md:px-4 
          md:py-3 
          md:text-sm
        `,
          !generalCategoryId ? "bg-primary/25" : "bg-primary/10",
        )}
      >
        {t('newest')}
      </button>
      {data.map((item) => (
        <button
          onClick={() => onClick(item.id)}
          className={cn(
            `
            flex 
            items-center 
            rounded-md 
            bg-primary/10 
            px-2 
            py-2 
            text-center 
            text-xs 
            transition 
            hover:opacity-75 
            md:px-4 
            md:py-3 
            md:text-sm
          `,
            item.id === generalCategoryId ? "bg-primary/25" : "bg-primary/10",
          )}
          key={item.id}
        >
          {/* {item.name} */}
          {t(item.name.toLowerCase())} 
          {/* In this example, we're using the item.name.toLowerCase() to match the keys in your translations file. */}
        </button>
      ))}
    </div>
  );
};
