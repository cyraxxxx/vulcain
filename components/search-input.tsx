"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import qs from "query-string";

import {useTranslations} from 'next-intl';

export const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const generalCategoryId = searchParams.get("generalCategoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const t = useTranslations('Search');

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      generalCategoryId: generalCategoryId,
    };

    const url = qs.stringifyUrl(
      { url: window.location.href, query },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  }, [debouncedValue, router, generalCategoryId]);

  return (
    <div className="relative">
      <Search className="absolute left-4 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        onChange={onChange}
        value={value}
        placeholder={t('search')}
        className="bg-primary/10 pl-10"
      />
    </div>
  );
};
